<?php

namespace App\Controller;

use App\Entity\Experiencia;
use App\Form\ExperienciaType;
use App\Repository\ExperienciaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Usuario;
use App\Entity\Localizacion;
use App\Entity\Comentario;

#[Route('/experiencia')]
class ExperienciaController extends AbstractController
{
    /* #[Route('/', name: 'app_experiencia_index', methods: ['GET'])]
    public function index(ExperienciaRepository $experienciaRepository): Response
    {
        return $this->render('experiencia/index.html.twig', [
            'experiencias' => $experienciaRepository->findAll(),
        ]);
    } */
    #[Route('/', name: 'app_experiencia_index', methods: ['GET'])]
    public function index(ExperienciaRepository $experienciaRepository): JsonResponse
    {
        $experiencias = $experienciaRepository->findAll();

        $experienciasArray = [];
        foreach ($experiencias as $experiencia) {
            $experienciaArray = [
                'id' => $experiencia->getId(),
                'titulo' => $experiencia->getTitulo(),
                'texto' => $experiencia->getTexto(),
                'puntuacion' => $experiencia->getPuntuacion(),
                'fecha' => $experiencia->getFecha() ? $experiencia->getFecha()->format('Y-m-d') : null,
                'usuario' => [
                    'id' => $experiencia->getUsuario() ? $experiencia->getUsuario()->getId() : null,
                    'nombre' => $experiencia->getUsuario() ? $experiencia->getUsuario()->getNombre() : null,
                    'mail' => $experiencia->getUsuario() ? $experiencia->getUsuario()->getMail() : null,
                    'ciudad' => $experiencia->getUsuario() ? $experiencia->getUsuario()->getCiudad() : null,
                ],
                'localizacion' => [
                    'id' => $experiencia->getLocalizacion() ? $experiencia->getLocalizacion()->getId() : null,
                    'nombre' => $experiencia->getLocalizacion() ? $experiencia->getLocalizacion()->getNombre() : null,
                    'provincia' => [
                        'id' => $experiencia->getLocalizacion() ? $experiencia->getLocalizacion()->getProvincia()->getId() : null,
                        'nombre' => $experiencia->getLocalizacion() ? $experiencia->getLocalizacion()->getProvincia()->getNombre() : null,
                        'comunidad' => [
                            'id' => $experiencia->getLocalizacion() ? $experiencia->getLocalizacion()->getProvincia()->getComunidad()->getId() : null,
                            'nombre' => $experiencia->getLocalizacion() ? $experiencia->getLocalizacion()->getProvincia()->getComunidad()->getNombre() : null,
                        ],
                    ],
                ],
                'comentarios' => [],
            ];

            foreach ($experiencia->getComentarios() as $comentario) {
                $experienciaArray['comentarios'][] = [
                    'id' => $comentario->getId(),
                    'texto' => $comentario->getTexto(),
                    'fecha' => $comentario->getFecha() ? $comentario->getFecha()->format('Y-m-d') : null,
                    'usuario_id' =>  $comentario->getUsuario() ? $comentario->getUsuario()->getId() : null,
                ];
            }

            $experienciasArray[] = $experienciaArray;
        }
        return new JsonResponse($experienciasArray);
    }

    /* #[Route('/new', name: 'app_experiencia_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $experiencium = new Experiencia();
        $form = $this->createForm(ExperienciaType::class, $experiencium);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($experiencium);
            $entityManager->flush();

            return $this->redirectToRoute('app_experiencia_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('experiencia/new.html.twig', [
            'experiencium' => $experiencium,
            'form' => $form,
        ]);
    } */
    #[Route('/experiencia/new', name: 'app_experiencia_new', methods: ['GET','POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Obtener los datos de la solicitud JSON
        $data = json_decode($request->getContent(), true);

        $experiencia = new Experiencia();
        $experiencia->setTitulo($data['titulo']);
        $experiencia->setTexto($data['texto']);
        /* $experiencia->setPuntuacion($data['puntuacion']); */
        /* $experiencia->setFecha(new \DateTime($data['fecha'])); */ 
        $experiencia->setUsuario($data['usuario_id']);
        /* $experiencia->setLocalizacion($data['localizacion_id']);
        $experiencia->setSubcategoria($data['localizacion_id']); */

        $entityManager->persist($experiencia);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Experiencia insertada correctamente'], Response::HTTP_CREATED);
    }

    /* #[Route('/{id}', name: 'app_experiencia_show', methods: ['GET'])]
    public function show(Experiencia $experiencium): Response
    {
        return $this->render('experiencia/show.html.twig', [
            'experiencium' => $experiencium,
        ]);
    } */
    #[Route('/{id}', name: 'app_experiencia_show', methods: ['GET'])]
    public function show(Experiencia $experiencium): Response
    {
        return $this->render('experiencia/show.html.twig', [
            'experiencium' => $experiencium,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_experiencia_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Experiencia $experiencium, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ExperienciaType::class, $experiencium);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_experiencia_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('experiencia/edit.html.twig', [
            'experiencium' => $experiencium,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_experiencia_delete', methods: ['POST'])]
    public function delete(Request $request, Experiencia $experiencium, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $experiencium->getId(), $request->request->get('_token'))) {
            $entityManager->remove($experiencium);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_experiencia_index', [], Response::HTTP_SEE_OTHER);
    }
}
