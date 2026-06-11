import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PemesananController::formBooking
* @see app/Http/Controllers/PemesananController.php:14
* @route '/booking/{jadwal}'
*/
export const formBooking = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formBooking.url(args, options),
    method: 'get',
})

formBooking.definition = {
    methods: ["get","head"],
    url: '/booking/{jadwal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PemesananController::formBooking
* @see app/Http/Controllers/PemesananController.php:14
* @route '/booking/{jadwal}'
*/
formBooking.url = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_jadwal' in args) {
        args = { jadwal: args.id_jadwal }
    }

    if (Array.isArray(args)) {
        args = {
            jadwal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jadwal: typeof args.jadwal === 'object'
        ? args.jadwal.id_jadwal
        : args.jadwal,
    }

    return formBooking.definition.url
            .replace('{jadwal}', parsedArgs.jadwal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PemesananController::formBooking
* @see app/Http/Controllers/PemesananController.php:14
* @route '/booking/{jadwal}'
*/
formBooking.get = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formBooking.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PemesananController::formBooking
* @see app/Http/Controllers/PemesananController.php:14
* @route '/booking/{jadwal}'
*/
formBooking.head = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: formBooking.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PemesananController::simpanBooking
* @see app/Http/Controllers/PemesananController.php:37
* @route '/booking'
*/
export const simpanBooking = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simpanBooking.url(options),
    method: 'post',
})

simpanBooking.definition = {
    methods: ["post"],
    url: '/booking',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PemesananController::simpanBooking
* @see app/Http/Controllers/PemesananController.php:37
* @route '/booking'
*/
simpanBooking.url = (options?: RouteQueryOptions) => {
    return simpanBooking.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PemesananController::simpanBooking
* @see app/Http/Controllers/PemesananController.php:37
* @route '/booking'
*/
simpanBooking.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: simpanBooking.url(options),
    method: 'post',
})

const PemesananController = { formBooking, simpanBooking }

export default PemesananController