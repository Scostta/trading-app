import { GoalFormData } from "../../../../types/forms"

export type GoalsFieldsValueType = GoalFormData["valuePrefix"]
export type GoalType = GoalFormData["type"]
type PosibleGoals = Array<{ label: string, field: string, valuePrefix: GoalsFieldsValueType, type: GoalType }>

export const posibleGoals = [
  {
    label: "Ganancia promedio",
    field: "averageWin",
    valuePrefix: "money",
    type: "PASSED",
  },
  {
    label: "Perdida promedio",
    field: "averageloss",
    valuePrefix: "money",
    type: "FAILED"
  },
  {
    label: "Saldo más alto",
    field: "highestBalance",
    valuePrefix: "money",
    type: "PASSED"
  },
  {
    label: "Ganancia/Perdida",
    field: "profit",
    valuePrefix: "money",
    type: "PASSED"
  },
  {
    label: "Patrimonio actual",
    field: "equity",
    valuePrefix: "money",
    type: "PASSED"
  },
  {
    label: "Perdida Máxima",
    field: "maxDrawdown",
    valuePrefix: "percentage",
    type: "FAILED"
  },
  {
    label: "Rentabilidad",
    field: "absoluteGain",
    valuePrefix: "percentage",
    type: "PASSED"
  },
  {
    label: "Retirada de dinero",
    field: "withdrawals",
    valuePrefix: "money",
    type: "PASSED"
  },
  {
    label: "Porcentage de trades ganados",
    field: "wonTradesPercent",
    valuePrefix: "percentage",
    type: "PASSED"
  },
  {
    label: "Porcentage de trades perdidos",
    field: "lostTradesPercent",
    valuePrefix: "percentage",
    type: "FAILED"
  }
] as PosibleGoals