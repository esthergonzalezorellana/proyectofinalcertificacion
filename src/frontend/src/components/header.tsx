import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
    return (
        <header class = "py-8 text-center">
        <h1 class="text-6xl font-light">Magic World</h1>
        <h2 class="text-3xl font-light bg-white">Characters from the Harry Potter saga</h2>
        </header>
    )
});