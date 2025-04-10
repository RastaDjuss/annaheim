export type Anaheim = {
    version: "0.1.0";
    name: "anaheim";
    instructions: [
        {
            name: "initialize";
            accounts: [
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: "createUser";
            accounts: [
                {
                    name: "userAccount";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "username";
                    type: "string";
                }
            ];
        }
    ];
    accounts: [
        {
            name: "userAccount";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "username";
                        type: "string";
                    }
                ];
            };
        }
    ];
};
export const IDL: Anaheim = {
    version: "0.1.0",
    name: "anaheim",
    instructions: [
        {
            name: "initialize",
            accounts: [
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: "createUser",
            accounts: [
                {
                    name: "userAccount",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "username",
                    type: "string",
                },
            ],
        },
    ],
    accounts: [
        {
            name: "userAccount",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "username",
                        type: "string",
                    },
                ],
            },
        },
    ],
};