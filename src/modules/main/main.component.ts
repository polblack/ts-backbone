/**
 * 
 * @desc: Main component
 */

import { component } from "../../backbonelib/core";

@component({
    templateUrl:`<header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler hidden-lg-up" type="button">&#9776;</button>
    <a class="navbar-brand" href="#"></a>
    <ul class="nav navbar-nav hidden-md-down">
        <li class="nav-item">
            <a class="nav-link navbar-toggler sidebar-toggler" href="#">&#9776;</a>
        </li>
        <mainmenu></mainmenu>
    </ul>
</header>
 <div class="app-body">
    <div class="sidebar">
        <nav class="sidebar-nav">
            <sidebarmenu></sidebarmenu>
        </nav>
    </div>
  
    <!-- Main content --> 
    <main class="main">

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <breadcrumbs></breadcrumbs>
        </ol>

        <div class="container-fluid">
             <content>
                <backbone-router></backbone-router>
             <content>
        </div>
        <!-- /.conainer-fluid -->
    </main>
</div>

<footer class="app-footer">
    
</footer> `,
    selector:"main",
    
})
export class MainComponent{
    
    events:any = {
        'click #menu1':"menu1click"
    };
    /**
     * click del menu
     */
    menu1click()
    {
        alert('menuclick');
    }
}