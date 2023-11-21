/**
 * @jest-environment jsdom
 */
import React, { ComponentProps } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";

import FormDialog from "./FormDialog";
import { TextField } from "@mui/material";

const FormDialogWithTestProps: React.FC<Partial<ComponentProps<typeof FormDialog>>> = ({
    children,
    onClose,
    open,
    submitEndpoint,
    title,
}) => (
    <FormDialog
        title={title ?? ""}
        submitEndpoint={submitEndpoint ?? ""}
        open={open ?? true}
        onClose={onClose ?? (() => {})}
    >
        {children}
    </FormDialog>
);

describe("FormDialog - generic form in modal dialog", () => {
    it("should not mount when closed", () => {
        const { queryByRole } = render(<FormDialogWithTestProps open={false} />);

        expect(queryByRole("form")).toBeNull();
    });

    it("should be visible when opened", () => {
        const formTitle = "my title";
        const { getByRole } = render(<FormDialogWithTestProps title={formTitle} />);

        expect(getByRole("form", { name: formTitle })).toBeVisible();
    });

    it("should include accessible header", () => {
        const exampleTitle = "my title";
        const { getByRole } = render(<FormDialogWithTestProps title={exampleTitle} />);

        expect(getByRole("heading", { name: exampleTitle })).toBeVisible();
    });

    it("should include submit button", () => {
        const { getByRole } = render(<FormDialogWithTestProps />);

        expect(getByRole("button", { name: /zapisz/i })).toBeEnabled();
    });

    it("should manage form values", async () => {
        const user = userEvent.setup();
        const { getByRole } = render(
            <FormDialogWithTestProps>
                <TextField name="name" defaultValue="Jan" label="name" />
                <TextField name="surname" defaultValue="X" label="surname" />
            </FormDialogWithTestProps>
        );

        await user.type(getByRole("textbox", { name: "surname" }), "iński");

        expect(getByRole("form")).toHaveFormValues({
            name: "Jan",
            surname: "Xiński",
        });
    });

    it.todo("should close dialog when submitted");
    it.todo("should show success message when submit succeeded");
    it.todo("should show error message when submit failed");
});
