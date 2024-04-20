import { defineStore } from 'pinia'
import { api } from '~/api';

export const useFilmsStore = defineStore('films', () => {
  const films = ref([]);
  const page = ref(1);
  const total = ref(0);
  const size = 3;

  const params: {
    category: number|null,
    country:  number|null,
    sortBy: string,
    sortDir: string,
    size: number,
    page: number,
  } = {
    category: null,
    country: null,
    sortBy: 'name',
    sortDir: 'desc',
    page: page.value,
    size
  };
  
  function changePage(pages:number) {
    page.value = pages;
    params.page = pages;
    fetchFilms();
  }

  function addSortToParams(sortBy: string) {
    params.sortBy = sortBy;
    fetchFilms();
  }

  function addCountryToParams(country:number|null) {
    params.country = country;
    fetchFilms();
  }

  function addCategoryToParams(category:number|null) {
    params.category = category;
    fetchFilms();
  }

  async function fetchFilms() {
    const response = await api.get('/films', {params});
    films.value = response.data.films;
    total.value = response.data.total;
  }

  return {
    films, 
    fetchFilms,
    addCategoryToParams,
    addCountryToParams,
    addSortToParams,
    total,
    size,
    page,
    changePage,
  }
})