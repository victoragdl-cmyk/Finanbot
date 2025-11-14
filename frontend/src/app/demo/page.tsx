'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

interface Goal {
  description: string
  amount: number
}

export default function DemoPage() {
  const [goal, setGoal] = useState<Goal>({ description: '', amount: 0 })
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!goal.description.trim() || goal.amount <= 0) {
      setMessage('Informe uma meta e um valor válido para continuar.')
      return
    }

    setMessage(`Meta "${goal.description}" registrada! Vamos planejar R$ ${goal.amount.toFixed(2)} juntos.`)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 lg:flex-row">
        <section className="w-full space-y-6 lg:w-2/5">
          <h1 className="text-4xl font-semibold text-foreground">Explore a demo guiada</h1>
          <p className="text-muted-foreground">
            Simule uma conversa com o FinanBot informando uma meta financeira. Usamos esses dados para mostrar como o assistente
            pode responder em tempo real.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-2">
              <label htmlFor="goal" className="text-sm font-medium text-foreground">
                Qual meta você quer atingir?
              </label>
              <input
                id="goal"
                value={goal.description}
                onChange={(event) => setGoal((previous) => ({ ...previous, description: event.target.value }))}
                placeholder="Ex.: Montar reserva de emergência"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-foreground">
                Quanto precisa investir?
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                value={goal.amount === 0 ? '' : goal.amount}
                onChange={(event) =>
                  setGoal((previous) => ({ ...previous, amount: Number(event.target.value) || 0 }))
                }
                placeholder="Ex.: 5000"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Gerar conversa de exemplo
            </button>

            {message && <p className="text-sm text-emerald-500">{message}</p>}
          </form>

          <p className="text-sm text-muted-foreground">
            Já possui conta?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Entre e continue a jornada real
            </Link>
          </p>
        </section>

        <section className="glass w-full rounded-3xl border border-border bg-card/60 p-6 lg:w-3/5">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Simulação de chat</p>
            <div className="space-y-3">
              <div className="ml-auto max-w-xs rounded-2xl bg-primary px-4 py-3 text-primary-foreground">
                <p>Quero organizar minhas finanças para o próximo trimestre.</p>
                <span className="mt-2 block text-right text-xs opacity-70">Você • 08:15</span>
              </div>

              <div className="max-w-lg rounded-2xl border border-border bg-background px-4 py-3 text-foreground">
                <p className="font-medium">FinanBot</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Perfeito! Vou analisar suas contas conectadas e criar um plano de ação com base nas suas metas e fluxo de caixa atual.
                </p>
                <span className="mt-2 block text-xs text-muted-foreground">FinanBot • 08:16</span>
              </div>

              <div className="ml-auto max-w-xs rounded-2xl bg-primary px-4 py-3 text-primary-foreground">
                <p>
                  {goal.description
                    ? `Quero atingir a meta ${goal.description} com R$ ${goal.amount || 0}.`
                    : 'Preciso juntar R$ 5.000 para minha reserva.'}
                </p>
                <span className="mt-2 block text-right text-xs opacity-70">Você • 08:17</span>
              </div>

              <div className="max-w-lg rounded-2xl border border-border bg-background px-4 py-3 text-foreground">
                <p className="font-medium">FinanBot</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ótimo! Vou considerar seus gastos recorrentes, oportunidades de economia e possíveis investimentos de baixo risco para montar um plano.
                </p>
                <span className="mt-2 block text-xs text-muted-foreground">FinanBot • 08:18</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
