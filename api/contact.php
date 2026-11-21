<?php
/**
 * Endpoint del formulario de contacto — PHP puro, sin dependencias.
 * Recibe POST JSON desde React: { name, email, service, message, website(honeypot) }
 */

// ============ ✏️ CONFIGURACIÓN: EDITA ESTOS VALORES ============
const TO_EMAIL   = 'contacto@tudominio.com';   // 📧 Correo que RECIBE los mensajes
const FROM_EMAIL = 'no-reply@tudominio.com';   // Debe ser una cuenta de TU dominio (evita spam en cPanel)
const SITE_NAME  = 'laucreatorcontent';
// Orígenes permitidos para CORS (tu dominio real). En local con Vite agrega 'http://localhost:5173'.
const ALLOWED_ORIGINS = ['https://tudominio.com', 'https://www.tudominio.com', 'http://localhost:5173'];
// ===============================================================

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}
// Elimina saltos de línea (previene inyección de cabeceras) y etiquetas HTML
function clean(string $v, bool $multiline = false): string {
    $v = trim(strip_tags($v));
    return $multiline ? preg_replace("/\r\n|\r/", "\n", $v) : preg_replace('/[\r\n]+/', ' ', $v);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') respond(204, []);
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST')    respond(405, ['success' => false, 'message' => 'Método no permitido.']);

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) respond(400, ['success' => false, 'message' => 'Solicitud inválida.']);

// Honeypot: si el campo oculto viene lleno es un bot. Fingimos éxito sin enviar nada.
if (!empty($data['website'])) respond(200, ['success' => true, 'message' => 'Mensaje enviado.']);

$name    = clean((string)($data['name'] ?? ''));
$email   = clean((string)($data['email'] ?? ''));
$service = clean((string)($data['service'] ?? ''));
$message = clean((string)($data['message'] ?? ''), true);

$errors = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 80)        $errors['name'] = 'Escribe tu nombre (2 a 80 caracteres).';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))            $errors['email'] = 'Escribe un correo válido.';
if (mb_strlen($message) < 10 || mb_strlen($message) > 3000) $errors['message'] = 'El mensaje debe tener entre 10 y 3000 caracteres.';
if ($errors) respond(422, ['success' => false, 'errors' => $errors]);

$subject = "Nuevo mensaje desde " . SITE_NAME . ($service ? " · $service" : '');
$body = "Nombre: $name\nCorreo: $email\nServicio: " . ($service ?: 'No indicado') . "\n\nMensaje:\n$message\n";

// From = cuenta de tu dominio; Reply-To = el visitante (así respondes directo y no cae en spam)
$headers = [
    'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$ok = mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);
if (!$ok) respond(500, ['success' => false, 'message' => 'No se pudo enviar el correo. Inténtalo más tarde.']);

respond(200, ['success' => true, 'message' => '¡Mensaje enviado! Te responderé pronto.']);
