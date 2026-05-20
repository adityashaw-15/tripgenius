"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { BudgetBreakdown as BudgetBreakdownType } from "@/types/trip";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colors = ["#14b8a6", "#f59e0b", "#0ea5e9", "#ec4899", "#8b5cf6"];

export function BudgetBreakdown({ budget }: { budget: BudgetBreakdownType }) {
  const data = Object.entries(budget).map(([name, value]) => ({ name, value }));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Budget</p>
      <h2 className="mt-2 text-2xl font-black">{formatCurrency(total)} plan</h2>
      <div className="mt-5 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={88} paddingAngle={4}>
              {data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="capitalize">{item.name}</span>
              <span className="font-semibold">{formatCurrency(item.value)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full" style={{ width: `${(item.value / total) * 100}%`, background: colors[index] }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
