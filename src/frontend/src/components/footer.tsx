import { component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
    return (
        <footer class="absolute bottom-3 w-full text-center">
            <div class="py-5 text-2xl bg-white opacity-60">
        &copy; 2024 Morgan González
        </div>
        </footer>
    )
});