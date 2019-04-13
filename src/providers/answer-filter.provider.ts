import { FilterService } from '../services/filter.service';
import { ANWSER_FILTER } from '../constants';

async function anwserFilterFactory(filterService: FilterService) {
  return filterService.createAnswerFilter();
}

export const anwserFilterProvider = {
  provide: ANWSER_FILTER,
  useFactory: anwserFilterFactory,
  inject: [FilterService],
};
