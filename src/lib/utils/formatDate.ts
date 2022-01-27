import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: Date | number) {
  return format(date, 'dd MMM yyyy', { locale: ptBR });
}
