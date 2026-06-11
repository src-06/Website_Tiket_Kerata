import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PencarianController::home
* @see app/Http/Controllers/PencarianController.php:12
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PencarianController::home
* @see app/Http/Controllers/PencarianController.php:12
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PencarianController::home
* @see app/Http/Controllers/PencarianController.php:12
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PencarianController::home
* @see app/Http/Controllers/PencarianController.php:12
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PencarianController::cariJadwal
* @see app/Http/Controllers/PencarianController.php:19
* @route '/jadwal/cari'
*/
export const cariJadwal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cariJadwal.url(options),
    method: 'get',
})

cariJadwal.definition = {
    methods: ["get","head"],
    url: '/jadwal/cari',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PencarianController::cariJadwal
* @see app/Http/Controllers/PencarianController.php:19
* @route '/jadwal/cari'
*/
cariJadwal.url = (options?: RouteQueryOptions) => {
    return cariJadwal.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PencarianController::cariJadwal
* @see app/Http/Controllers/PencarianController.php:19
* @route '/jadwal/cari'
*/
cariJadwal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cariJadwal.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PencarianController::cariJadwal
* @see app/Http/Controllers/PencarianController.php:19
* @route '/jadwal/cari'
*/
cariJadwal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cariJadwal.url(options),
    method: 'head',
})

const PencarianController = { home, cariJadwal }

export default PencarianController