/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

import HelloWorld from "./HelloWorld";

describe("frontend test example", () => {
    it("should render hello world", () => {
        const node = render(<HelloWorld />).container;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(node).toHaveTextContent("Hello World");
    });
});
