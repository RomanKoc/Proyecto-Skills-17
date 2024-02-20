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

#[Route('/experiencia')]
class ExperienciaController extends AbstractController
{
    #[Route('/', name: 'app_experiencia_index', methods: ['GET'])]
    public function index(ExperienciaRepository $experienciaRepository): Response
    {
        return $this->render('experiencia/index.html.twig', [
            'experiencias' => $experienciaRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_experiencia_new', methods: ['GET', 'POST'])]
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
    }

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
        if ($this->isCsrfTokenValid('delete'.$experiencium->getId(), $request->request->get('_token'))) {
            $entityManager->remove($experiencium);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_experiencia_index', [], Response::HTTP_SEE_OTHER);
    }
}
