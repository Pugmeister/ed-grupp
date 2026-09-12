<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
  http_response_code(500);
  echo json_encode(['error' => 'config.php not found']);
  exit;
}

$config = require $configPath;

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $config['allowed_origins'], true)) {
  header("Access-Control-Allow-Origin: $origin");
  header('Access-Control-Allow-Credentials: true');
} else {
  header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

// PHPMailer без Composer (папка lib/PHPMailer)
$phpmailerDir = __DIR__ . '/lib/PHPMailer';
if (!is_file($phpmailerDir . '/PHPMailer.php')) {
  http_response_code(500);
  echo json_encode(['error' => 'PHPMailer not found. Put files into lib/PHPMailer/']);
  exit;
}

require $phpmailerDir . '/Exception.php';
require $phpmailerDir . '/PHPMailer.php';
require $phpmailerDir . '/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$name    = trim((string)($_POST['name'] ?? ''));
$phone   = trim((string)($_POST['phone'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $phone === '') {
  http_response_code(422);
  echo json_encode(['error' => 'Укажите имя и телефон']);
  exit;
}

$fileInfo = null;
$maxBytes = ((int)($config['max_file_mb'] ?? 15)) * 1024 * 1024;
$upload = $_FILES['upload'] ?? null;

if ($upload && ($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
  if (($upload['error'] ?? 0) !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Ошибка загрузки файла']);
    exit;
  }
  if (($upload['size'] ?? 0) > $maxBytes) {
    http_response_code(400);
    echo json_encode(['error' => 'Файл слишком большой']);
    exit;
  }
  $fileInfo = $upload;
}

$safe = static function (string $s): string {
  return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$when = date('d.m.Y H:i');
$phoneTel = preg_replace('/\s+/', '', $phone);

$html = '
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #2a2a2a;">
        <tr>
          <td style="padding:28px 32px;border-bottom:1px solid #2a2a2a;">
            <div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#E85D3B;">ED GRUPP</div>
            <div style="font-size:22px;font-weight:bold;color:#F4F4F0;margin-top:8px;">Новая заявка с сайта</div>
            <div style="font-size:13px;color:#888;margin-top:6px;">' . $safe($when) . '</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#F4F4F0;">
              <tr>
                <td style="padding:10px 0;color:#888;width:120px;vertical-align:top;">Имя</td>
                <td style="padding:10px 0;">' . $safe($name) . '</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;vertical-align:top;">Телефон</td>
                <td style="padding:10px 0;"><a href="tel:' . $safe($phoneTel) . '" style="color:#E85D3B;text-decoration:none;">' . $safe($phone) . '</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;vertical-align:top;">Email</td>
                <td style="padding:10px 0;">' . ($email !== '' ? '<a href="mailto:' . $safe($email) . '" style="color:#F4F4F0;">' . $safe($email) . '</a>' : '—') . '</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;vertical-align:top;">Сообщение</td>
                <td style="padding:10px 0;line-height:1.5;">' . ($message !== '' ? nl2br($safe($message)) : '—') . '</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;vertical-align:top;">Файл</td>
                <td style="padding:10px 0;">' . ($fileInfo ? $safe($fileInfo['name']) : 'нет') . '</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #2a2a2a;font-size:12px;color:#666;">
            Письмо отправлено автоматически с формы сайта ED GRUPP
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>';

$alt = "Заявка ED GRUPP\nИмя: $name\nТелефон: $phone\nEmail: $email\n\n$message";

$mail = new PHPMailer(true);

try {
  $mail->CharSet = 'UTF-8';
  $mail->isSMTP();
  $mail->Host       = $config['smtp_host'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $config['smtp_user'];
  $mail->Password   = $config['smtp_pass'];
  $mail->SMTPSecure = $config['smtp_secure']; // 'ssl' или 'tls'
  $mail->Port       = (int)$config['smtp_port'];

  $mail->setFrom($config['from_email'], $config['from_name'] ?? 'ED GRUPP Site');
  $mail->addAddress($config['to_email'], $config['to_name'] ?? 'ED GRUPP');

  if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $mail->addReplyTo($email, $name);
  }

  $mail->isHTML(true);
  $mail->Subject = 'Заявка с сайта ED GRUPP — ' . $name;
  $mail->Body    = $html;
  $mail->AltBody = $alt;

  if ($fileInfo) {
    $mail->addAttachment($fileInfo['tmp_name'], $fileInfo['name']);
  }

  $mail->send();
  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'Mail error: ' . ($mail->ErrorInfo ?: $e->getMessage()),
  ]);
}