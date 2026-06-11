import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InvoiceController::invoice
* @see app/Http/Controllers/InvoiceController.php:10
* @route '/invoice/{tiket}'
*/
export const invoice = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoice.url(args, options),
    method: 'get',
})

invoice.definition = {
    methods: ["get","head"],
    url: '/invoice/{tiket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::invoice
* @see app/Http/Controllers/InvoiceController.php:10
* @route '/invoice/{tiket}'
*/
invoice.url = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions) => {
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

    return invoice.definition.url
            .replace('{tiket}', parsedArgs.tiket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::invoice
* @see app/Http/Controllers/InvoiceController.php:10
* @route '/invoice/{tiket}'
*/
invoice.get = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoice.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::invoice
* @see app/Http/Controllers/InvoiceController.php:10
* @route '/invoice/{tiket}'
*/
invoice.head = (args: { tiket: number | { id_tiket: number } } | [tiket: number | { id_tiket: number } ] | number | { id_tiket: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invoice.url(args, options),
    method: 'head',
})

const InvoiceController = { invoice }

export default InvoiceController