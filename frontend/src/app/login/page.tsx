'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    // Placeholder for authentication request
    setTimeout(() => {
      setStatus('success')
    }, 800)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Entrar</h1>
          <p className="text-muted-foreground">
            Acesse sua conta FinanBot para continuar conversando com suas finanças.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Entrando...' : 'Entrar'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-center text-emerald-500">Login realizado com sucesso! (placeholder)</p>
          )}
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Ainda não tem uma conta?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  )
}
