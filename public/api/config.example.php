<?php
return [
  // SMTP Mail.ru (ящик, с которого шлём)
  'smtp_host'   => 'smtp.mail.ru',
  'smtp_port'   => 465,
  'smtp_secure' => 'ssl',
  'smtp_user'   => 'artyom.m.r@mail.ru',
  'smtp_pass'   => 'ПАРОЛЬ_ИЛИ_ПАРОЛЬ_ПРИЛОЖЕНИЯ',

  'from_email'  => 'artyom.m.r@mail.ru',
  'from_name'   => 'ED GRUPP Site',

  // Куда приходит заявка (тест — тебе)
  'to_email'    => 'artyom.m.r@mail.ru',
  'to_name'     => 'Артём',

  'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'https://pugmeister.github.io',
    'https://edgrupp.ru',
    'https://www.edgrupp.ru',
  ],

  'max_file_mb' => 15,
];