import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StasiunController::index
* @see app/Http/Controllers/StasiunController.php:11
* @route '/stasiun'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/stasiun',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StasiunController::index
* @see app/Http/Controllers/StasiunController.php:11
* @route '/stasiun'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StasiunController::index
* @see app/Http/Controllers/StasiunController.php:11
* @route '/stasiun'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StasiunController::index
* @see app/Http/Controllers/StasiunController.php:11
* @route '/stasiun'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StasiunController::create
* @see app/Http/Controllers/StasiunController.php:34
* @route '/stasiun/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/stasiun/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StasiunController::create
* @see app/Http/Controllers/StasiunController.php:34
* @route '/stasiun/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StasiunController::create
* @see app/Http/Controllers/StasiunController.php:34
* @route '/stasiun/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StasiunController::create
* @see app/Http/Controllers/StasiunController.php:34
* @route '/stasiun/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StasiunController::store
* @see app/Http/Controllers/StasiunController.php:39
* @route '/stasiun'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/stasiun',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StasiunController::store
* @see app/Http/Controllers/StasiunController.php:39
* @route '/stasiun'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StasiunController::store
* @see app/Http/Controllers/StasiunController.php:39
* @route '/stasiun'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StasiunController::edit
* @see app/Http/Controllers/StasiunController.php:51
* @route '/stasiun/{stasiun}/edit'
*/
export const edit = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/stasiun/{stasiun}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StasiunController::edit
* @see app/Http/Controllers/StasiunController.php:51
* @route '/stasiun/{stasiun}/edit'
*/
edit.url = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stasiun: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_stasiun' in args) {
        args = { stasiun: args.id_stasiun }
    }

    if (Array.isArray(args)) {
        args = {
            stasiun: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stasiun: typeof args.stasiun === 'object'
        ? args.stasiun.id_stasiun
        : args.stasiun,
    }

    return edit.definition.url
            .replace('{stasiun}', parsedArgs.stasiun.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StasiunController::edit
* @see app/Http/Controllers/StasiunController.php:51
* @route '/stasiun/{stasiun}/edit'
*/
edit.get = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StasiunController::edit
* @see app/Http/Controllers/StasiunController.php:51
* @route '/stasiun/{stasiun}/edit'
*/
edit.head = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StasiunController::update
* @see app/Http/Controllers/StasiunController.php:58
* @route '/stasiun/{stasiun}'
*/
export const update = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/stasiun/{stasiun}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StasiunController::update
* @see app/Http/Controllers/StasiunController.php:58
* @route '/stasiun/{stasiun}'
*/
update.url = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stasiun: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_stasiun' in args) {
        args = { stasiun: args.id_stasiun }
    }

    if (Array.isArray(args)) {
        args = {
            stasiun: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stasiun: typeof args.stasiun === 'object'
        ? args.stasiun.id_stasiun
        : args.stasiun,
    }

    return update.definition.url
            .replace('{stasiun}', parsedArgs.stasiun.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StasiunController::update
* @see app/Http/Controllers/StasiunController.php:58
* @route '/stasiun/{stasiun}'
*/
update.put = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\StasiunController::destroy
* @see app/Http/Controllers/StasiunController.php:70
* @route '/stasiun/{stasiun}'
*/
export const destroy = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/stasiun/{stasiun}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StasiunController::destroy
* @see app/Http/Controllers/StasiunController.php:70
* @route '/stasiun/{stasiun}'
*/
destroy.url = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stasiun: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id_stasiun' in args) {
        args = { stasiun: args.id_stasiun }
    }

    if (Array.isArray(args)) {
        args = {
            stasiun: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        stasiun: typeof args.stasiun === 'object'
        ? args.stasiun.id_stasiun
        : args.stasiun,
    }

    return destroy.definition.url
            .replace('{stasiun}', parsedArgs.stasiun.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StasiunController::destroy
* @see app/Http/Controllers/StasiunController.php:70
* @route '/stasiun/{stasiun}'
*/
destroy.delete = (args: { stasiun: number | { id_stasiun: number } } | [stasiun: number | { id_stasiun: number } ] | number | { id_stasiun: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const StasiunController = { index, create, store, edit, update, destroy }

export default StasiunController