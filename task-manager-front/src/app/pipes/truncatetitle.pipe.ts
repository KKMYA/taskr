import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateTitle'
})
export class TruncatePipeTitle implements PipeTransform {
  transform(value: string, limit: number = 40, fallback = 'Pas de titre.'): string {
    if (!value) return fallback;
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
