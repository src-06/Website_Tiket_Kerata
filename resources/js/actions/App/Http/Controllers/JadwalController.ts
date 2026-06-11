import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:13
* @route '/jadwal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:13
* @route '/jadwal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:13
* @route '/jadwal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::index
* @see app/Http/Controllers/JadwalController.php:13
* @route '/jadwal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::create
* @see app/Http/Controllers/JadwalController.php:24
* @route '/jadwal/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/jadwal/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::create
* @see app/Http/Controllers/JadwalController.php:24
* @route '/jadwal/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::create
* @see app/Http/Controllers/JadwalController.php:24
* @route '/jadwal/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::create
* @see app/Http/Controllers/JadwalController.php:24
* @route '/jadwal/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::store
* @see app/Http/Controllers/JadwalController.php:32
* @route '/jadwal'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jadwal',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JadwalController::store
* @see app/Http/Controllers/JadwalController.php:32
* @route '/jadwal'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::store
* @see app/Http/Controllers/JadwalController.php:32
* @route '/jadwal'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JadwalController::edit
* @see app/Http/Controllers/JadwalController.php:48
* @route '/jadwal/{jadwal}/edit'
*/
export const edit = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/jadwal/{jadwal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalController::edit
* @see app/Http/Controllers/JadwalController.php:48
* @route '/jadwal/{jadwal}/edit'
*/
edit.url = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{jadwal}', parsedArgs.jadwal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::edit
* @see app/Http/Controllers/JadwalController.php:48
* @route '/jadwal/{jadwal}/edit'
*/
edit.get = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalController::edit
* @see app/Http/Controllers/JadwalController.php:48
* @route '/jadwal/{jadwal}/edit'
*/
edit.head = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalController::update
* @see app/Http/Controllers/JadwalController.php:57
* @route '/jadwal/{jadwal}'
*/
export const update = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/jadwal/{jadwal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\JadwalController::update
* @see app/Http/Controllers/JadwalController.php:57
* @route '/jadwal/{jadwal}'
*/
update.url = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{jadwal}', parsedArgs.jadwal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::update
* @see app/Http/Controllers/JadwalController.php:57
* @route '/jadwal/{jadwal}'
*/
update.put = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\JadwalController::destroy
* @see app/Http/Controllers/JadwalController.php:73
* @route '/jadwal/{jadwal}'
*/
export const destroy = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jadwal/{jadwal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JadwalController::destroy
* @see app/Http/Controllers/JadwalController.php:73
* @route '/jadwal/{jadwal}'
*/
destroy.url = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{jadwal}', parsedArgs.jadwal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalController::destroy
* @see app/Http/Controllers/JadwalController.php:73
* @route '/jadwal/{jadwal}'
*/
destroy.delete = (args: { jadwal: number | { id_jadwal: number } } | [jadwal: number | { id_jadwal: number } ] | number | { id_jadwal: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const JadwalController = { index, create, store, edit, update, destroy }

export default JadwalController