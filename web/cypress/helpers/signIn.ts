export const signInRequest = ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    Cypress.Cookies.preserveOnce('connect.sid');
    cy.request({
        url: Cypress.config().baseUrl + '/api/graphql',
        method: 'POST',
        body: {
            query: `mutation signUp($input: SignUpInput!) {
                        signUp(input: $input)
                    }`,
            variables: { input: { username, password } },
        },
    });
};
