import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { ExperienciaIndividualComponent } from './experiencias/experiencia-individual/experiencia-individual.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InfoUsuarioComponent } from './info-usuario/info-usuario.component';

export const routes: Routes = [
    {
        path: '',
        component: BienvenidaComponent
    },
    {
        path: 'bienvenida',
        component: BienvenidaComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'info-usuario',
        component: InfoUsuarioComponent
    },
    {
        path: 'experiencias',
        component: ExperienciasComponent,
        children: [
            {
                path: ':experiencia-individual/:id',
                component: ExperienciaIndividualComponent
            },
            {
                path: ':experiencia-nueva', /* Creo que no hay que meter id, revisar */
                component: ExperienciaIndividualComponent
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'bienvenida'
    }
];
