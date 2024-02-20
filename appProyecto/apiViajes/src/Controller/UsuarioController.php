<?php


namespace App\Controller;

use App\Entity\Usuario;
use App\Form\UsuarioType;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/usuario')]
class UsuarioController extends AbstractController
{
    /* #[Route('/', name: 'app_usuario_index', methods: ['GET'])]
    public function index(UsuarioRepository $usuarioRepository): Response
    {
        return $this->render('usuario/index.html.twig', [
            'usuarios' => $usuarioRepository->findAll(),
        ]);
    } */
    /* #[Route('/', name: 'app_usuario_index', methods: ['GET'])]
    public function index(UsuarioRepository $usuarioRepository): JsonResponse
    {
        $usuarios = $usuarioRepository->findAll();

        $usuariosArray = [];
        foreach ($usuarios as $usuario) {
            $usuariosArray[] = [
                'id' => $usuario->getId(),
                'nombre' => $usuario->getNombre(),
                'mail' => $usuario->getMail(),
                'ciudad' => $usuario->getCiudad(),
                'password' => $usuario->getPassword(),
                'rol' => [
                    $usuario->getRol()->getId(),
                ],
            ];
        }

        return new JsonResponse($usuariosArray);
    } */
    #[Route('/', name: 'app_usuario_index', methods: ['GET'])]
    public function index(UsuarioRepository $usuarioRepository, SerializerInterface $serializer): JsonResponse
    {
        $usuarios = $usuarioRepository->findAll();

        $jsonUsuarios = $serializer->serialize($usuarios, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($jsonUsuarios, JsonResponse::HTTP_OK, [], true);
    }

    /* #[Route('/new', name: 'app_usuario_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $usuario = new Usuario();
        $form = $this->createForm(UsuarioType::class, $usuario);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($usuario);
            $entityManager->flush();

            return $this->redirectToRoute('app_usuario_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('usuario/new.html.twig', [
            'usuario' => $usuario,
            'form' => $form,
        ]);
    } */

    #[Route('/new', name: 'app_usuario_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        
        $data = json_decode($request->getContent(), true);
        //ORIGINAL
        // Crear una nueva instancia de Usuario y asignar los datos recibidos
        $usuario = new Usuario();
        $usuario->setNombre($data['nombre']);
        $usuario->setApellidos($data['apellidos']);
        $usuario->setMail($data['mail']);
        $usuario->setCiudad($data['ciudad']);
        $usuario->setPassword($data['password']);

        //Rol por defecto user!
        $rolPorDefecto = $entityManager->getReference('App\Entity\Rol', 2);
        $usuario->setRol($rolPorDefecto);

        // Guardar el nuevo usuario en la base de datos
        $entityManager->persist($usuario);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Usuario insertado correctamente'], Response::HTTP_CREATED);
    }
    /* #[Route('/new', name: 'app_usuario_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Verificar si todos los campos requeridos están presentes
            if (!isset($data['nombre'], $data['apellidos'], $data['mail'], $data['ciudad'], $data['password'])) {
                throw new \InvalidArgumentException('Faltan datos requeridos');
            }

            // Crear una nueva instancia de Usuario y asignar los datos recibidos
            $usuario = new Usuario();
            $usuario->setNombre($data['nombre']);
            $usuario->setApellidos($data['apellidos']);
            $usuario->setMail($data['mail']);
            $usuario->setCiudad($data['ciudad']);
            $usuario->setPassword($data['password']);

            $rolPorDefecto = $entityManager->getReference('App\Entity\Rol', 2);
            $usuario->setRol($rolPorDefecto);

            // Guardar el nuevo usuario en la base de datos
            $entityManager->persist($usuario);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Usuario insertado correctamente'], Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage(), $request->getContent()]);
        }
    } */


    #[Route('/{id}', name: 'app_usuario_show', methods: ['GET'])]
    public function show(Usuario $usuario): Response
    {
        return $this->render('usuario/show.html.twig', [
            'usuario' => $usuario,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_usuario_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Usuario $usuario, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UsuarioType::class, $usuario);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_usuario_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('usuario/edit.html.twig', [
            'usuario' => $usuario,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_usuario_delete', methods: ['POST'])]
    public function delete(Request $request, Usuario $usuario, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $usuario->getId(), $request->request->get('_token'))) {
            $entityManager->remove($usuario);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_usuario_index', [], Response::HTTP_SEE_OTHER);
    }
}
