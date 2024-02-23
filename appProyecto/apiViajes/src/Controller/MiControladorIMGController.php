<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/controllador')]
class MiControladorIMGController extends AbstractController
{
    /**
     * @Route("/upload-image", name="upload_image", methods={"POST"})
     */
    #[Route('/upload-image', name: 'upload_image', methods: ['POST'])]
    public function uploadImage(Request $request): JsonResponse
    {
        // Permite accesos de origen cruzado desde el dominio de Angular
        $response = new JsonResponse();
        $response->headers->set('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
        // Si planeas enviar solicitudes POST con credenciales, también puedes necesitar
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization, X-Requested-With');

        // Define el directorio de destino para las imágenes cargadas
        $directorioDestino = $this->getParameter('kernel.project_dir') . '/public/assets/uploads/';

        // Verifica si el directorio de destino existe, si no, intenta crearlo
        if (!file_exists($directorioDestino)) {
            mkdir($directorioDestino, 0777, true);
        }

        // Verifica si el archivo ha sido enviado
        if ($request->files->has('imagen')) {
            $archivo = $request->files->get('imagen');
            $nombreArchivo = $archivo->getClientOriginalName();
            $rutaDestino = $directorioDestino . $nombreArchivo;

            // Intenta mover el archivo desde su ubicación temporal al directorio de destino
            try {
                $archivo->move($directorioDestino, $nombreArchivo);
                // Si la carga es exitosa, envía una respuesta JSON con la URL de la imagen
                $response->setData(['urlImagen' => '/assets/uploads/' . $nombreArchivo]);
            } catch (\Exception $e) {
                // Si falla la carga, envía un mensaje de error
                $response->setData(['error' => 'Error al subir el archivo.']);
            }
        } else {
            // Si no se encuentra el archivo en la petición, envía un mensaje de error
            $response->setData(['error' => 'Archivo no enviado.']);
        }

        return $response;
    }
}
