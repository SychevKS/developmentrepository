import { Layout } from '@/components/Layout'
import { Topics } from '@/components/Topics'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

const queryClient = new QueryClient()

async function topicsLoader() {
  const topics = await fetch('api/topics').then((res) => res.json())

  return { topics }
}

export async function topicsAction({ request }) {
  const formData = await request.formData()

  console.log(formData)

  /* fetch(`api/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topic),
  }).then((res) => res.json()) */
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        loader: topicsLoader,
        index: true,
        element: <Topics />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
