import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KeretaController::index
* @see app/Http/Controllers/KeretaController.php:11
* @route '/kereta'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kereta',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KeretaController::index
* @see app/Http/Controllers/KeretaController.php:11
* @route '/kereta'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeretaController::index
* @see app/Http/Controllers/KeretaController.php:11
* @route '/kereta'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KeretaController::index
* @see app/Http/Controllers/KeretaController.php:11
* @route '/kereta'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KeretaController::create
* @see app/Http/Controllers/KeretaController.php:18
* @route '/kereta/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/kereta/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KeretaController::create
* @see app/Http/Controllers/KeretaController.php:18
* @route '/kereta/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeretaController::create
* @see app/Http/Controllers/KeretaController.php:18
* @route '/kereta/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KeretaController::create
* @see app/Http/Controllers/KeretaController.php:18
* @route '/kereta/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KeretaController::store
* @see app/Http/Controllers/KeretaController.php:23
* @route '/kereta'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kereta',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KeretaController::store
* @see app/Http/Controllers/KeretaController.php:23
* @route '/kereta'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeretaController::store
* @see app/Http/Controllers/KeretaController.php:23
* @route '/kereta'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KeretaController::edit
* @see app/Http/Controllers/KeretaController.php:35
* @route '/kereta/{kereta}/edit'
*/
export const edit = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/kereta/{kereta}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KeretaController::edit
* @see app/Http/Controllers/KeretaController.php:35
* @route '/kereta/{kereta}/edit'
*/
edit.url = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kereta: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_kereta' in args) {
        args = { kereta: args.id_kereta }
    }

    if (Array.isArray(args)) {
        args = {
            kereta: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kereta: typeof args.kereta === 'object'
        ? args.kereta.id_kereta
        : args.kereta,
    }

    return edit.definition.url
            .replace('{kereta}', parsedArgs.kereta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeretaController::edit
* @see app/Http/Controllers/KeretaController.php:35
* @route '/kereta/{kereta}/edit'
*/
edit.get = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KeretaController::edit
* @see app/Http/Controllers/KeretaController.php:35
* @route '/kereta/{kereta}/edit'
*/
edit.head = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KeretaController::update
* @see app/Http/Controllers/KeretaController.php:42
* @route '/kereta/{kereta}'
*/
export const update = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/kereta/{kereta}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KeretaController::update
* @see app/Http/Controllers/KeretaController.php:42
* @route '/kereta/{kereta}'
*/
update.url = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kereta: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_kereta' in args) {
        args = { kereta: args.id_kereta }
    }

    if (Array.isArray(args)) {
        args = {
            kereta: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kereta: typeof args.kereta === 'object'
        ? args.kereta.id_kereta
        : args.kereta,
    }

    return update.definition.url
            .replace('{kereta}', parsedArgs.kereta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeretaController::update
* @see app/Http/Controllers/KeretaController.php:42
* @route '/kereta/{kereta}'
*/
update.put = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KeretaController::destroy
* @see app/Http/Controllers/KeretaController.php:54
* @route '/kereta/{kereta}'
*/
export const destroy = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kereta/{kereta}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KeretaController::destroy
* @see app/Http/Controllers/KeretaController.php:54
* @route '/kereta/{kereta}'
*/
destroy.url = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kereta: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_kereta' in args) {
        args = { kereta: args.id_kereta }
    }

    if (Array.isArray(args)) {
        args = {
            kereta: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kereta: typeof args.kereta === 'object'
        ? args.kereta.id_kereta
        : args.kereta,
    }

    return destroy.definition.url
            .replace('{kereta}', parsedArgs.kereta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KeretaController::destroy
* @see app/Http/Controllers/KeretaController.php:54
* @route '/kereta/{kereta}'
*/
destroy.delete = (args: { kereta: number | { id_kereta: number } } | [kereta: number | { id_kereta: number } ] | number | { id_kereta: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const KeretaController = { index, create, store, edit, update, destroy }

export default KeretaController