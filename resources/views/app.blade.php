<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
    <x-inertia::head>
      <title>{{ config('app.name') }}</title>
      <meta name="description" content="{{ config('app.desc') }}">
      <link rel="icon" href="favicon.jpg" type="image/jpg">
    </x-inertia::head>
  </head>
  <body class="font-sans antialiased">
    <x-inertia::app />
  </body>
</html>
