import { Router, Routes, CanActivateFn } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './Auth/login/login.component';
import { UserRegistrationComponent } from './Auth/user-registration/user-registration.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PreviewPostComponent } from './preview-post/preview-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AuthService } from './Auth/auth.service';
import { inject } from '@angular/core';

export const authGuard : CanActivateFn= () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isLoggedIn()){
        return true;  // allow access
    }
    else{
        alert('Must login first! \n Redirecting to login-page');
        router.navigate(['/login']);
        return false;
    }

}

export const routes: Routes = [

    { 
        path: '',
        component: WelcomePageComponent,

    },
    { 
        path: 'home',
        component: WelcomePageComponent,

    },
    { 
        path: 'login',
        component: LoginComponent,

    },
    { 
        path: 'signup',
        component: UserRegistrationComponent,

    },
    {
        path:'createpost',
        component:CreatePostComponent,
        canActivate :[authGuard]
         
    },
    {
         path:'preview',
         component: PreviewPostComponent,
         canActivate :[authGuard]
     }
    ,
    {
        path:'post/:id',
        component: PostDetailsComponent,
        canActivate :[authGuard]
    },
    {
        path:'**',
        redirectTo:'/home'

    }

    
];
