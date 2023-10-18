import filters from '@client/utils/filters';

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: typeof filters;
  }
}
