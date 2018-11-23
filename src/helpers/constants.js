export const INPUT_TYPES = {
    TEXT: 'text',
    PASSWORD: 'password',
    NUMBER: 'number',
    BUTTON: 'button',
    CHECKBOX: 'checkbox',
    FILE: 'file',
    HIDDEN: 'hidden',
    IMAGE: 'image',
    RADIO: 'radio',
    RESET: 'reset',
    SUBMIT: 'submit',
};

export const ERROR_MESSAGE = {
    WRONG_CONFIRM_PASSWORD: 'Password is not confirmed',
};

export const RETIRE_OPTIONS_PERSON = [
    {
        id: 1,
        name: 'I have an exact age in mind',
        code: 'exact-age',
    },
    {
        id: 2,
        name: 'I have an approximate age in mind',
        code: 'approximate-age',
    },
    {
        id: 3,
        name: 'I don\'t plan to retire',
        code: 'do-not-have-plan',
    },
];
export const RETIRE_OPTIONS_PARTNER = [
    {
        id: 1,
        name: 'They have an exact age in mind',
        code: 'exact-age',
    },
    {
        id: 2,
        name: 'They have an approximate age in mind',
        code: 'approximate-age',
    },
    {
        id: 3,
        name: 'They don\'t plan to retire',
        code: 'do-not-have-plan',
    },
];

export const RETIRE_APPROXIMATE_AGE = [
    {
        id: 1,
        name: 'In my 40s',
        code: 45,
    },
    {
        id: 2,
        name: 'In my 50s',
        code: 55,
    },
    {
        id: 3,
        name: 'In my 60s',
        code: 65,
    },
    {
        id: 4,
        name: 'In my 70s',
        code: 75,
    },
    {
        id: 5,
        name: 'In my 80s',
        code: 85,
    },
];

export const RETIRE_PARTNER_APPROXIMATE_AGE = [
    {
        id: 1,
        name: 'In their 40s',
        code: 45,
    },
    {
        id: 2,
        name: 'In their 50s',
        code: 55,
    },
    {
        id: 3,
        name: 'In their 60s',
        code: 65,
    },
    {
        id: 4,
        name: 'In their 70s',
        code: 75,
    },
    {
        id: 5,
        name: 'In their 80s',
        code: 85,
    },
];

export const NATIONALITIES = {
    UK: 'UK',
    USA: 'USA',
    UKRAINE: 'UKRAINE',
    AUSTRALIA: 'AUSTRALIA',
};

export const PERIODS = [
    {
        id: 1,
        code: 'per_month',
        name: 'Per month',
    },
    {
        id: 2,
        code: 'per_year',
        name: 'Per year',
    },
];

export const PERIODS_TERM = [
    {
        id: 1,
        code: 'per_month',
        name: 'Per month',
    },
    {
        id: 2,
        code: 'per_year',
        name: 'Per year',
    },
    {
        id: 3,
        code: 'per_term',
        name: 'Per term',
    },
];

export const PERCENTAGE = [
    {
        id: 1,
        code: 'percentage',
        name: 'Percentage',
    },
    {
        id: 2,
        code: 'per_year',
        name: 'Per year',
    },
];

export const PERCENTAGE_SALARY = [
    {
        id: 1,
        code: 'F',
        name: 'amount (£)',
    },
    {
        id: 2,
        code: 'P',
        name: '% of base salary',
    },
];

export const CHILDREN_SERVICES = [
    {
        id: 1,
        code: 'nanny',
        name: 'Nanny',
    },
    {
        id: 2,
        code: 'childminder',
        name: 'Childminder',
    },
    {
        id: 3,
        code: 'none-of-the-above',
        name: 'None of the above',
    },
];

export const CASH_SAVING_ACCOUNT = [
    {
        asset_parent_type_id: 12,
        code: 'cash_current_account',
        name: 'Current account',
        text: 'A freely accessible account for managing your day-to-day income and expenses.',
        id: 13,
    },
    {
        asset_parent_type_id: 12,
        id: 14,
        name: 'Term deposit',
        text: 'A freely accessible account for managing your day-to-day income and expenses.',
        code: 'cash_term_deposit',
    },
    {
        asset_parent_type_id: 12,
        id: 15,
        name: 'Savings account',
        text: 'An account that attracts interest, and may have minimum deposit limits and limitations on withdrawals.',
        code: 'cash_savings',
    },
];

export const FINANCE_PENSIONS = [
    {
        id: 1,
        name: 'Defined Benefit or Final Salary',
        text: 'A scheme whose value is linked to the number of years you were employed or a member.',
        code: 'benefit',
    },
    {
        id: 2,
        name: 'Defined Contribution',
        text: 'Any scheme to which you or your employer make regular contributions.',
        code: 'contribution',
    },
    {
        id: 3,
        name: 'Annuity',
        text: 'A product paying a fixed amount of income each year in your retirement.',
        code: 'annuity',
    },
];

export const FINANCE_ISA = [
    {
        id: 1,
        name: 'Cash ISA',
        text: 'Select this for cash held in an individual savings account, whether it accrues interest or not.',
        code: 'isa_cash',
    },
    {
        id: 2,
        name: 'Stocks & Shares',
        text: 'Select this for shares held in an individual savings account.',
        code: 'isa_stocks_shares',
    },
    {
        id: 3,
        name: 'Junior ISA',
        text: 'Select this if you are saving for a child under the age of 18 in either cash or shares.',
        code: 'isa_junior',
    },
    {
        id: 4,
        name: 'Innovative finance ISA',
        text: 'Select this if you hold peer-to-peer products in an individual savings account.',
        code: 'isa_innovative',
    },
    {
        id: 5,
        name: 'Lifetime ISA',
        text: 'Select this if you are saving for retirement using a specific type of individual savings account.',
        code: 'isa_lifetime',
    },
    {
        id: 6,
        name: 'Help to buy ISA',
        text: 'Select this if you are saving for a first home in an individual savings account.',
        code: 'isa_help_to_buy',
    },
];

export const FINANCE_INVESTMENTS = [
    {
        id: 1,
        name: 'Enterprise Investment Scheme',
        text: 'Early stage company investments attracting special tax relief.',
        code: 'enterprise',
    },
    {
        id: 2,
        name: 'Seed Enterprise Investment Scheme',
        text: ' Very early stage company investments attracting special tax relief.',
        code: 'seed',
    },
    {
        id: 3,
        name: 'Venture Capital Trust',
        text: 'Smaller company investments attracting special tax relief.',
        code: 'venture',
    },
];

export const DEBTS_MORTGAGE = [
    {
        id: 1,
        name: 'Repayment',
        text: 'Where you make repayments which cover the capital plus interest.',
        code: 'mortgage_repayment',
    },
    {
        id: 2,
        name: 'Interest only',
        text: 'Where your payments only cover the interest portion of your loan.',
        code: 'mortgage_interest',
    },
    {
        id: 3,
        name: 'Endowment',
        text: 'Where payments cover both interest as well as an investment designed to pay off the mortgage on maturity.',
        code: 'mortgage_endowment',
    },
];

export const DEBTS_LOAN = [
    {
        id: 1,
        name: 'Repayment',
        text: 'Where you make repayments which cover the capital plus interest.',
        code: 'other_loans_repayment',
    },
    {
        id: 2,
        name: 'Interest only',
        text: 'Where your payments only cover the interest portion of your loan.',
        code: 'other_loans_interest',
    },
];

export const RATE_TYPE = [
    {
        id: 1,
        name: 'Fixed rate',
        text: '',
        code: 'fixed',
    },
    {
        id: 2,
        name: 'Variable rate',
        text: '',
        code: 'variable',
    },
    {
        id: 3,
        name: 'Not sure',
        text: '',
        code: 'dont_know',
    },
];

export const RISK_TOLERANCE = [
    {
        id: 1,
        text: '<p>Compared to others, how do you rate your willingness to take financial risks?</p>',
        answers: [
            {
                id: 1,
                name: 'Extremely low risk taker',
                code: 'extremely_low_risk_taker',
            },
            {
                id: 2,
                name: 'Very low risk taker',
                code: 'very_low_riks_taker',
            },
            {
                id: 3,
                name: 'Low risk taker',
                code: 'low_risk_taker',
            },
            {
                id: 4,
                name: 'Average risk taker',
                code: 'average_risk_taker',
            },
            {
                id: 5,
                name: 'High risk taker',
                code: 'high_riks_taker',
            },
            {
                id: 6,
                name: 'Very high risk taker',
                code: 'very_high_risk_taker',
            },
            {
                id: 7,
                name: 'Extremely high risk taker',
                code: 'extremely_high_risk_taker',
            },
        ],
    },
    {
        id: 2,
        text: '<p>How easily do you adapt when things go wrong financially?</p>',
        answers: [
            {
                id: 1,
                name: 'Very uneasily',
                code: 'very_uneasily',
            },
            {
                id: 2,
                name: 'Somewhat uneasily',
                code: 'somewhat_uneasily',
            },
            {
                id: 3,
                name: 'Somewhat easily',
                code: 'Somewhat_easily',
            },
            {
                id: 4,
                name: 'Very easily',
                code: 'very_easily',
            },
        ],
    },
    {
        id: 3,
        text: '<p>When you think of the word “risk” in a financial context, which of the following words comes to mind first?</p>',
        answers: [
            {
                id: 1,
                name: 'Danger',
                code: 'danger',
            },
            {
                id: 2,
                name: 'Uncertainty',
                code: 'uncertainty',
            },
            {
                id: 3,
                name: 'Opportunity',
                code: 'opportunity',
            },
            {
                id: 4,
                name: 'Thrill',
                code: 'thrill',
            },
        ],
    },
    {
        id: 4,
        text: '<p>When faced with a major financial decision, are you more concerned about the possible losses or the possible gains?</p>',
        answers: [
            {
                id: 1,
                name: 'Always the possible losses',
                code: 'always_loses',
            },
            {
                id: 1,
                name: 'Usually the possible losses',
                code: 'usually_loses',
            },
            {
                id: 1,
                name: 'Usually the possible gains',
                code: 'usually_gains',
            },
            {
                id: 1,
                name: 'Always the possible gains',
                code: 'always_gains',
            },
        ],
    },
    {
        id: 5,
        text: '<p>What degree of risk are you currently prepared to take with your financial decisions?</p>',
        answers: [
            {
                id: 1,
                name: 'Very small',
                code: 'very_small',
            },
            {
                id: 2,
                name: 'Small',
                code: 'small',
            },
            {
                id: 3,
                name: 'Medium',
                code: 'medium',
            },
            {
                id: 4,
                name: 'Large',
                code: 'large',
            },
            {
                id: 5,
                name: 'Very large',
                code: 'very_large',
            },
        ],
    },
    {
        id: 6,
        // eslint-disable-next-line max-len
        text: '<p>Suppose that 5 years ago you bought shares in a highly regarded company. That same year the company experienced a severe decline in sales due to poor management. The price of the shares dropped drastically and you sold at a substantial loss.</p><p>The company has been restructured under new management and most experts now expect it to produce better than average returns. Given your bad past experience with this company, would you buy shares now?</p>',
        answers: [
            {
                id: 1,
                name: 'Definitely not',
                code: 'definetely_not',
            },
            {
                id: 2,
                name: 'Probably not',
                code: 'probably_not',
            },
            {
                id: 3,
                name: 'Not sure',
                code: 'not_sure',
            },
            {
                id: 4,
                name: 'Probably',
                code: 'probably',
            },
            {
                id: 5,
                name: 'Definitely',
                code: 'definitely',
            },
        ],
    },
    {
        id: 7,
        text: '<p>Investments can go up or down in value and experts often say you should be prepared to weather a downturn. By how much could the total of all your investments go down before you would begin to feel uncomfortable?</p>',
        answers: [
            {
                id: 1,
                name: 'Any fall in value would make me feel uncomfortable',
                code: 'uncomforttable',
            },
            {
                id: 2,
                name: '10%',
                code: '10',
            },
            {
                id: 3,
                name: '20%',
                code: '20',
            },
            {
                id: 4,
                name: '33%',
                code: '33',
            },
            {
                id: 5,
                name: '50%',
                code: '50',
            },
            {
                id: 6,
                name: 'More than 50%',
                code: 'more_50',
            },
        ],
    },
    {
        id: 8,
        // eslint-disable-next-line max-len
        text: '<p>Most investment portfolios have a mix of investments − some of the investments may have high expected returns but with high risk, some may have medium expected returns and medium risk, and some may be low-risk/ low-return. (For example, shares and property would be high-risk/ high-return whereas cash and bank deposits would be low-risk/ low-return.)</p><p>Which mix of investments do you find most appealing? Would you prefer all low-risk/ low-return, all high-risk/ high-return, or something in between?</p>',
        table: [
            {
                colspan: 4,
                text: 'Mix of Investments in Portfolio',
            },
            {
                colspan: 1,
                text: [
                    [
                        'Portfolio',
                        'High Risk / Return',
                        'Medium Risk / Return',
                        'Low Risk / Return',
                    ],
                    [
                        '1',
                        '0%',
                        '0%',
                        '100%',
                    ],
                    [
                        '2',
                        '0%',
                        '30%',
                        '70%',
                    ],
                    [
                        '3',
                        '10%',
                        '40%',
                        '50%',
                    ],
                    [
                        '4',
                        '30%',
                        '40%',
                        '30%',
                    ],
                    [
                        '5',
                        '50%',
                        '40%',
                        '10%',
                    ],
                    [
                        '6',
                        '70%',
                        '30%',
                        '0%',
                    ],
                    [
                        '7',
                        '10%',
                        '0%',
                        '0%',
                    ],
                ],
            },
        ],
        answers: [
            {
                id: 1,
                name: 'Portfolio 1',
                code: 'portfolio_1',
            },
            {
                id: 2,
                name: 'Portfolio 2',
                code: 'portfolio_2',
            },
            {
                id: 3,
                name: 'Portfolio 3',
                code: 'portfolio_3',
            },
            {
                id: 4,
                name: 'Portfolio 4',
                code: 'portfolio_4',
            },
            {
                id: 5,
                name: 'Portfolio 5',
                code: 'portfolio_5',
            },
            {
                id: 6,
                name: 'Portfolio 6',
                code: 'portfolio_6',
            },
            {
                id: 7,
                name: 'Portfolio 7',
                code: 'portfolio_7',
            },
        ],
    },
    {
        id: 9,
        // eslint-disable-next-line max-len
        text: '<p>With some types of investment, such as cash and bank deposits, the value of the investment is fixed. However inflation will cause the purchasing power of this value to decrease.</p><p>With other types of investment, such as shares and property, the value is not fixed. It will vary. In the short term it may even fail below the purchase price. However, over the long term, the value of the shares and property should certainly increase by more than the rate of inflation.</p><p>With this in mind, which is more important to you − that the value of your investments does not fail or that it retains its purchasing power?</p>',
        answers: [
            {
                id: 1,
                name: 'Much more important that the value does not fall',
                code: 'much_more_not_fall',
            },
            {
                id: 2,
                name: 'Somewhat more important that the value does not fall',
                code: 'somewhat_not_fall',
            },
            {
                id: 3,
                name: 'Somewhat more important that the value retains its purchasing power',
                code: 'somewhat_retains',
            },
            {
                id: 4,
                name: 'Much more important that the value retains its purchasing power',
                code: 'much_more_retains',
            },
        ],
    },
    {
        id: 10,
        text: '<p>Think of the average rate of return you would expect to earn on an investment portfolio over the next ten years. How does this compare with what you think you would earn if you invested the money in bank deposits?</p>',
        answers: [
            {
                id: 1,
                name: 'About the same rate as from bank deposits',
                code: 'about_same',
            },
            {
                id: 1,
                name: 'About one and half times the rate from bank deposits',
                code: 'about_1',
            },
            {
                id: 1,
                name: 'About twice the rate from bank deposits',
                code: 'about_twice',
            },
            {
                id: 1,
                name: 'About two and a half times the rate from bank deposits',
                code: 'about_2',
            },
            {
                id: 1,
                name: 'About three times the rate from bank deposits',
                code: 'about_3',
            },
            {
                id: 1,
                name: 'More than three times the rate from bank deposits',
                code: 'more_than_3',
            },
        ],
    },
];

export const OPTION_RISK_TOLERANCE = {
    'Strongly disagree': 'Strongly disagree',
    Disagree: 'Disagree',
    'Neither agree or disagree': 'Neither agree or disagree',
    Agree: 'Agree',
    'Strongly agree': 'Strongly agree',
};

export const PROPERTY_TYPE = [
    {
        id: 1,
        name: 'Main residence',
        code: 'property_main',
    },
    {
        id: 2,
        name: 'Second home',
        code: 'property_second',
    },
    {
        id: 3,
        name: 'Buy-to-let property',
        code: 'property_buy_to_let',
    },
    {
        id: 4,
        name: 'Holiday home',
        code: 'property_holiday',
    },
    {
        id: 5,
        name: 'Woodland',
        code: 'property_woodland',
    },
    {
        id: 6,
        name: 'Commercial property',
        code: 'property_commercial',
    },
    {
        id: 7,
        name: 'Agricultural property',
        code: 'property_agricultural',
    },
    {
        id: 8,
        name: 'Property portfolio',
        code: 'property_portfolio',
    },
];

export const SECTION_FINANCE = [
    {
        id: 0,
        section: 'pension',
        title: 'Pensions',
        link: '/survey/finance/add-pensions',
        edit_link: '/survey/finance/about-pensions',
        description: 'Pensions, final salary schemes, and annuities.',
        button_text: '+ Add pensions',
        icon: 'pensions.svg',
    },
    {
        id: 1,
        section: 'isa',
        title: 'ISAs',
        link: '/survey/finance/add-isa',
        edit_link: '/survey/finance/about-isa',
        description: 'Cash ISAs, Stocks & Shares ISAs and more.',
        button_text: '+ Add an ISA',
        icon: 'ISAs.svg',
    },
    {
        id: 2,
        section: 'cash',
        title: 'Cash savings',
        link: '/survey/finance/add-cash-savings-account',
        edit_link: '/survey/finance/about-cash-savings-account',
        description: 'Any savings held in cash whether it earns interest or not.',
        button_text: '+ Add cash savings',
        icon: 'cash_savings.svg',
    },
    {
        id: 3,
        section: 'investment',
        title: 'Other investments',
        link: '/survey/finance/add-investments',
        edit_link: '/survey/finance/about-investments',
        description: 'Anything else including unit trusts, bonds, crypto and more.',
        button_text: '+ Add an investment',
        icon: 'investments.svg',
    },
    {
        id: 4,
        section: 'property',
        title: 'Properties',
        link: '/survey/finance/add-property',
        edit_link: '/survey/finance/about-property',
        description: 'Pensions, final salary schemes, and annuities.',
        button_text: '+ Add a property',
        icon: 'properties.svg',
    },
];

export const SECTION_DEBTS = [
    {
        id: 0,
        section: 'mortgages',
        title: 'Mortgages',
        link: '/survey/debts/add-mortgage',
        edit_link: '/survey/debts/about-mortgage',
        description: 'Any outstanding property loans including mortgages and buy-to-lets.',
        button_text: '+ Add a mortgage',
        icon: 'mortgage.svg',
    },
    {
        id: 1,
        section: 'other_loans',
        title: 'Other loans',
        link: '/survey/debts/add-loans',
        edit_link: '/survey/debts/about-loans',
        description: 'Personal loans or loans from friends or family.',
        button_text: '+ Add a loan',
        icon: 'loans.svg',
    },
    {
        id: 2,
        section: 'credit_card',
        title: 'Outstanding credit card',
        link: '/survey/debts/add-credit-card',
        edit_link: '/survey/debts/about-credit-card',
        description: 'Any credit cards which are outstanding at the end of the month.',
        button_text: '+ Add a credit card',
        icon: 'credit_card.svg',
    },
];

export const SECTION_FACTFIND = [
    {
        id: 0,
        section: 'family',
        title: 'You and your family',
        link: '/survey/family/know-you',
        description: 'Tell us about yourself, what you do for a living and the people who matter to you most.',
        action: 'todo',
    },
    {
        id: 1,
        section: 'finance',
        title: 'Financial Holdings',
        link: '/survey/finance/assets',
        description: 'Tell us about any pensions, investments, savings and other assets you own.',
        action: 'todo',
    },
    {
        id: 2,
        section: 'income',
        title: 'Income',
        link: '/survey/income/salary-income',
        description: 'Tell us about any income you receive.',
        action: 'todo',
    },
    {
        id: 3,
        section: 'charity',
        title: 'Charity & gifting',
        link: '/survey/charity/add-charity',
        description: 'Tell us about any giving you do.',
        action: 'todo',
    },
    {
        id: 4,
        section: 'debts',
        title: 'Debts',
        link: '/survey/debts/assets',
        description: 'Tell us about any mortgages or other debts you have.',
        action: 'todo',
    },
    {
        id: 5,
        section: 'expense',
        title: 'Expenses',
        link: '/survey/expenses/add-children-underage-expenses',
        description: 'Tell us about how you spend your money.',
        action: 'todo',
    },
    {
        id: 6,
        section: 'insurance',
        title: 'Protection',
        link: '/survey/expenses/add-insurance',
        description: 'Tell us about any insurance policies you have in place to protect yourself and your family.',
        action: 'todo',
    },
    {
        id: 7,
        section: 'risk',
        title: 'Risk tolerance',
        link: '/survey/risk-tolerance/add-risk-tolerance',
        description: 'Tell us about your appetite for risk so we can recommend appropriate investments.',
        action: 'todo',
    },
    {
        id: 8,
        section: 'provider',
        title: 'Your providers',
        link: '/survey/product-providers/add-product-providers',
        description: 'Tell us your policy numbers and we can get up to date information on your behalf',
        action: 'todo',
    },
];

export const SOFT_FACTS_RADIO_BUTTON = [
    {
        id: 0,
        code: 'objectives',
        name: 'Objectives',
    },
    {
        id: 1,
        code: 'converstaion_starters',
        name: 'Conversation starters',
    },
    {
        id: 2,
        code: 'hobbies',
        name: 'Hobbies',
    },
    {
        id: 3,
        code: 'riskprofile',
        name: 'Risk profile',
    },
    {
        id: 4,
        code: 'retirementage',
        name: 'Retirement age',
    },
    {
        id: 5,
        code: 'discoverycall',
        name: 'Discovery call',
    },
];

export const ROLE_OPTIONS = [
    {
        code: 'admin',
        title: 'Admin',
        subtitle: 'All permissions including team and client managment',
    },
    {
        code: 'paraplanner',
        title: 'Paraplanner',
        subtitle: 'Access to view everything and do client managment',
    },
    {
        code: 'specialist',
        title: 'Specialist',
        subtitle: 'Access to view everything and do client managment',
    },
    {
        code: 'adviser',
        title: 'Adviser',
        subtitle: 'Can only see and manage his own clients',
    },
];

export const MEDICAL_CONDITIONS = [{
    id: 1,
    code: 'diabetes',
    name: 'Diabetes',
},
{
    id: 2,
    code: 'cancer',
    name: 'Cancer',
},
];

export const OWNERS = [{
    id: 1,
    code: 'john',
    name: 'John',
},
{
    id: 2,
    code: 'client 2',
    name: '[Client 2]',
},
];

export const BENEFICIARIES = [{
    id: 1,
    code: 'client 2',
    name: '[Client 2]',
},
{
    id: 2,
    code: 'child 1',
    name: '[Child 1]',
},
{
    id: 3,
    code: 'child 2',
    name: '[Child 2]',
},
];
