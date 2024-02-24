<?php

namespace App\Controller;

use App\Entity\Comentario;
use App\Entity\Usuario;
use App\Entity\Experiencia;
use App\Repository\ComentarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;



#[Route('/comentario')]
class ComentarioController extends AbstractController
{
    #[Route('/', name: 'app_comentario_index', methods: ['GET'])]
    public function index(ComentarioRepository $comentarioRepository): JsonResponse
    {
        $comentarios = $comentarioRepository->findAll();

        $comentariosArray = [];
        foreach ($comentarios as $comentario) {
            $comentariosArray[] = [
                'id' => $comentario->getId(),
                'texto' => $comentario->getTexto(),
                'fecha' => $comentario->getFecha()->format('Y-m-d'),
                'usuario' => [
                    'id' => $comentario->getUsuario()->getId(),
                    'nombre' => $comentario->getUsuario()->getNombre(),
                ],
                'experiencia' => [
                    'id' => $comentario->getExperiencia()->getId(),
                    'titulo' => $comentario->getExperiencia()->getTitulo(),
                ],
            ];
        }
        return new JsonResponse($comentariosArray);
    }

    #[Route('/comentario/new', name: 'app_comentario_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $comentario = new Comentario();
        $comentario->setTexto($data['texto']);

        $fecha = new \DateTime($data['fecha']);
        $comentario->setFecha($fecha);

        $usuario = $entityManager->getRepository(Usuario::class)->find($data['usuario_id']);
        $experiencia = $entityManager->getRepository(Experiencia::class)->find($data['experiencia_id']);

        $comentario->setUsuario($usuario);
        $comentario->setExperiencia($experiencia);

        $entityManager->persist($comentario);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Comentario insertado correctamente'], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_comentario_show', methods: ['GET'])]
    public function show(Comentario $comentario): Response
    {
        return $this->render('comentario/show.html.twig', [
            'comentario' => $comentario,
        ]);
    }

    #[Route('/comentario/{id}/edit', name: 'app_comentario_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Comentario $comentario, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $comentario->setTexto($data['texto']);

        $fecha = new \DateTime($data['fecha']);
        $comentario->setFecha($fecha);

        $usuario = $entityManager->getRepository(Usuario::class)->find($data['usuario_id']);
        $experiencia = $entityManager->getRepository(Experiencia::class)->find($data['experiencia_id']);

        $comentario->setUsuario($usuario);
        $comentario->setExperiencia($experiencia);

        $entityManager->flush();

        return new JsonResponse(['message' => 'Comentario modificado correctamente'], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_comentario_delete', methods: ['GET', 'POST'])]
    public function delete(Comentario $comentario, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($comentario);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Comentario eliminado correctamente'], Response::HTTP_OK);
    }
}
