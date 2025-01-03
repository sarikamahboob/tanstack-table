import {
  rankItem
} from '@tanstack/match-sorter-utils'
import { FilterFn } from "@tanstack/react-table"
import { User } from '../../Types/types'

export const fuzzyFilter: FilterFn<User> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({itemRank})
  return itemRank.passed
}

export const convertCamelToTitleCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};