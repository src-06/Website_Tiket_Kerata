import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PembayaranController::formPembayaran
* @see app/Http/Controllers/PembayaranController.php:13
* @route '/pembayaran/{tiket}'
*/
export const formPembayaran = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formPembayaran.url(args, options),
    method: 'get',
})

formPembayaran.definition = {
    methods: ["get","head"],
    url: '/pembayaran/{tiket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::formPembayaran
* @see app/Http/Controllers/PembayaranController.php:13
* @route '/pembayaran/{tiket}'
*/
formPembayaran.url = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tiket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_tiket' in args) {
        args = { tiket: args.id_tiket }
    }

    if (Array.isArray(args)) {
        args = {
            tiket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tiket: typeof args.tiket === 'object'
        ? args.tiket.id_tiket
        : args.tiket,
    }

    return formPembayaran.definition.url
            .replace('{tiket}', parsedArgs.tiket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::formPembayaran
* @see app/Http/Controllers/PembayaranController.php:13
* @route '/pembayaran/{tiket}'
*/
formPembayaran.get = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: formPembayaran.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PembayaranController::formPembayaran
* @see app/Http/Controllers/PembayaranController.php:13
* @route '/pembayaran/{tiket}'
*/
formPembayaran.head = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: formPembayaran.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PembayaranController::prosesPembayaran
* @see app/Http/Controllers/PembayaranController.php:26
* @route '/pembayaran/{tiket}'
*/
export const prosesPembayaran = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: prosesPembayaran.url(args, options),
    method: 'post',
})

prosesPembayaran.definition = {
    methods: ["post"],
    url: '/pembayaran/{tiket}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PembayaranController::prosesPembayaran
* @see app/Http/Controllers/PembayaranController.php:26
* @route '/pembayaran/{tiket}'
*/
prosesPembayaran.url = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tiket: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_tiket' in args) {
        args = { tiket: args.id_tiket }
    }

    if (Array.isArray(args)) {
        args = {
            tiket: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tiket: typeof args.tiket === 'object'
        ? args.tiket.id_tiket
        : args.tiket,
    }

    return prosesPembayaran.definition.url
            .replace('{tiket}', parsedArgs.tiket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::prosesPembayaran
* @see app/Http/Controllers/PembayaranController.php:26
* @route '/pembayaran/{tiket}'
*/
prosesPembayaran.post = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: prosesPembayaran.url(args, options),
    method: 'post',
})

const PembayaranController = { formPembayaran, prosesPembayaran }

export default PembayaranController