import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TiketController::index
* @see app/Http/Controllers/TiketController.php:10
* @route '/tiket'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tiket',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TiketController::index
* @see app/Http/Controllers/TiketController.php:10
* @route '/tiket'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TiketController::index
* @see app/Http/Controllers/TiketController.php:10
* @route '/tiket'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TiketController::index
* @see app/Http/Controllers/TiketController.php:10
* @route '/tiket'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const TiketController = { index }

export default TiketController