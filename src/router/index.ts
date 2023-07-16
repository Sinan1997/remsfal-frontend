import { createRouter, createWebHistory } from 'vue-router'
import ProjectSelectionView from '@/views/ProjectSelectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ProjectSelection',
      component: ProjectSelectionView
    },
    {
      path: '/new-project',
      name: 'NewProject',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/NewProjectView.vue')
    },
    {
      path: '/project/:projectId',
      name: 'Project',
      props: true,
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ProjectView.vue')
    },
    {
      path: '/account-settings',
      name: 'AccountSettings',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AccountSettingsView.vue')
    },
    {
      path: '/account-contacts',
      name: 'AccountContacts',
      // route level code-splitting
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AccountContactsView.vue')
    },
    {
      path: '/ticket-system',
      name: 'TicketSystem',
      component: () => import('@/views/TicketSystemView.vue')
    },
    {
      path: '/create-ticket',
      name: 'CreateTicket',
      component: () => import('@/views/CreateTicketView.vue')
    },
    {
      path: '/trouble',
      name: 'trouble',
      component: () => import('@/views/TroubleTicketView.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('@/views/ServiceTicketView.vue')
    },
    {
      path: '/new-hardware',
      name: 'hardware',
      component: () => import('@/views/NewHardwareTicketView.vue')
    },
    {
      path: '/defect-hardware',
      name: 'defectHardware',
      component: () => import('@/views/DefectHardwareTicketView.vue')
    }

  ]
})

export default router
