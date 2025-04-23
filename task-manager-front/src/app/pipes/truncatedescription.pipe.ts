import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDescription'
})
export class TruncatePipeDescription implements PipeTransform {
  transform(value: string, limit: number = 100, fallback = 'Pas de description.'): string {
    if (!value) return fallback;
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }
}
