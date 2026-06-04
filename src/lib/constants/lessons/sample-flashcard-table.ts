/**
 * Sample lesson demonstrating flashcard and table section types.
 * This is a temporary harness to verify the new components work correctly.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m1-typescript-foundations";

export const SAMPLE_LESSON: LessonContent = {
  id: "sample-flashcard-table",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Conceptos clave de TypeScript",
        en: "Key TypeScript concepts",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Esta lección demuestra los nuevos componentes de flashcard y tabla.",
        en: "This lesson demonstrates the new flashcard and table components.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        es: "Flashcard: ¿Qué es TypeScript?",
        en: "Flashcard: What is TypeScript?",
      },
    },
    {
      type: "flashcard",
      flashcardId: "ts-what-is",
      front: {
        es: "¿Qué es TypeScript y cuál es su relación con JavaScript?",
        en: "What is TypeScript and how does it relate to JavaScript?",
      },
      back: {
        es: "TypeScript es un superset tipado de JavaScript que compila a JavaScript plano. Añade un sistema de tipos estático opcional que detecta errores en tiempo de compilación.",
        en: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds an optional static type system that catches errors at compile time.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        es: "Flashcard: Tipos primitivos",
        en: "Flashcard: Primitive types",
      },
    },
    {
      type: "flashcard",
      flashcardId: "ts-primitives",
      front: {
        es: "¿Cuáles son los tipos primitivos en TypeScript?",
        en: "What are the primitive types in TypeScript?",
      },
      back: {
        es: "string, number, boolean, null, undefined, symbol, bigint",
        en: "string, number, boolean, null, undefined, symbol, bigint",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        es: "Tabla: Comparación de tipos",
        en: "Table: Type comparison",
      },
    },
    {
      type: "table",
      headers: [
        { es: "Tipo", en: "Type" },
        { es: "Descripción", en: "Description" },
        { es: "Ejemplo", en: "Example" },
      ],
      rows: [
        {
          cells: [
            { es: "string", en: "string" },
            { es: "Cadena de texto", en: "Text string" },
            { es: '"Hola QA"', en: '"Hello QA"' },
          ],
        },
        {
          cells: [
            { es: "number", en: "number" },
            { es: "Número (entero o decimal)", en: "Number (integer or decimal)" },
            { es: "42, 3.14", en: "42, 3.14" },
          ],
        },
        {
          cells: [
            { es: "boolean", en: "boolean" },
            { es: "Verdadero o falso", en: "True or false" },
            { es: "true, false", en: "true, false" },
          ],
        },
        {
          cells: [
            { es: "any", en: "any" },
            { es: "Cualquier tipo (evitar)", en: "Any type (avoid)" },
            { es: "let x: any = 5", en: "let x: any = 5" },
          ],
        },
      ],
      caption: {
        es: "Tipos primitivos más comunes en TypeScript",
        en: "Most common primitive types in TypeScript",
      },
    },
    {
      type: "heading",
      level: 3,
      content: {
        es: "Tabla: Ventajas de TypeScript",
        en: "Table: TypeScript advantages",
      },
    },
    {
      type: "table",
      headers: [
        { es: "Ventaja", en: "Advantage" },
        { es: "Beneficio", en: "Benefit" },
      ],
      rows: [
        {
          cells: [
            { es: "Tipado estático", en: "Static typing" },
            { es: "Detecta errores antes de ejecutar", en: "Catches errors before runtime" },
          ],
        },
        {
          cells: [
            { es: "Autocompletado", en: "Autocomplete" },
            { es: "Mejor experiencia en el editor", en: "Better editor experience" },
          ],
        },
        {
          cells: [
            { es: "Refactorización segura", en: "Safe refactoring" },
            { es: "Cambia nombres con confianza", en: "Rename with confidence" },
          ],
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Los componentes de flashcard y tabla ahora están disponibles para usar en cualquier lección.",
        en: "Flashcard and table components are now available for use in any lesson.",
      },
    },
  ],
};
