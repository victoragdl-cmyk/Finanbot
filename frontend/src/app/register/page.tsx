'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }))
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      setSuccess(false)
      return
    }

    setError(null)
    setSuccess(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Criar conta</h1>
          <p className="text-muted-foreground">
            Configure sua conta FinanBot em poucos minutos e comece a organizar suas finanças.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={handleChange('name')}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange('email')}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange('password')}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-emerald-500">Conta criada! Você pode acessar com seu e-mail.</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Criar conta
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já possui uma conta?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  )
}
