export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "scope-enum": [
            2,
            "always",
            [
                "ui",
                "api",
                "auth",
                "pets",
                "appointments",
                "store",
                "health",
                "config",
                "deps",
                "ci",
            ],
        ],
    },
};
