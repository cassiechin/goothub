export interface Deployment {
    /** The unique identifier of the deployment. */
    uid: string
    /** The name of the deployment. */
    name: string
    /** The URL of the deployment. */
    url: string
    /** Timestamp of when the deployment got created. */
    created: number
    /** The source of the deployment. */
    source?: "cli" | "git" | "import" | "import/repo" | "clone/repo"
    /** In which state is the deployment. */
    state?:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED"
    /** The type of the deployment. */
    type: "LAMBDAS"
    /** Metadata information of the user who created the deployment. */
    creator: {
        /** The unique identifier of the user. */
        uid: string
        /** The email address of the user. */
        email?: string
        /** The username of the user. */
        username?: string
        /** The GitHub login of the user. */
        githubLogin?: string
        /** The GitLab login of the user. */
        gitlabLogin?: string
    }
    /** Metadata information from the Git provider. */
    meta?: { [key: string]: string }
    /** On which environment has the deployment been deployed to. */
    target?: ("production" | "staging") | null
    /** An error object in case aliasing of the deployment failed. */
    aliasError?: {
        code: string
        message: string
    } | null
    aliasAssigned?: (number | boolean) | null
    /** Timestamp of when the deployment got created. */
    createdAt?: number
    /** Timestamp of when the deployment started building at. */
    buildingAt?: number
    /** Timestamp of when the deployment got ready. */
    ready?: number
    /** Since June 2023 Substate of deployment when readyState is 'READY' Tracks whether or not deployment has seen production traffic: - STAGED: never seen production traffic - PROMOTED: has seen production traffic */
    readySubstate?: "STAGED" | "PROMOTED"
    /** State of all registered checks */
    checksState?: "registered" | "running" | "completed"
    /** Conclusion for checks */
    checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled"
    /** Vercel URL to inspect the deployment. */
    inspectorUrl: string | null
    /** Deployment can be used for instant rollback */
    isRollbackCandidate?: boolean | null
    /** The project settings which was used for this deployment */
    projectSettings?: {
        framework?:
        | (
            | "blitzjs"
            | "nextjs"
            | "gatsby"
            | "remix"
            | "astro"
            | "hexo"
            | "eleventy"
            | "docusaurus-2"
            | "docusaurus"
            | "preact"
            | "solidstart"
            | "dojo"
            | "ember"
            | "vue"
            | "scully"
            | "ionic-angular"
            | "angular"
            | "polymer"
            | "svelte"
            | "sveltekit"
            | "sveltekit-1"
            | "ionic-react"
            | "create-react-app"
            | "gridsome"
            | "umijs"
            | "sapper"
            | "saber"
            | "stencil"
            | "nuxtjs"
            | "redwoodjs"
            | "hugo"
            | "jekyll"
            | "brunch"
            | "middleman"
            | "zola"
            | "hydrogen"
            | "vite"
            | "vitepress"
            | "vuepress"
            | "parcel"
            | "sanity"
            | "storybook"
        )
        | null
        gitForkProtection?: boolean
        gitLFS?: boolean
        devCommand?: string | null
        installCommand?: string | null
        buildCommand?: string | null
        nodeVersion?: "18.x" | "16.x" | "14.x" | "12.x" | "10.x"
        outputDirectory?: string | null
        publicSource?: boolean | null
        rootDirectory?: string | null
        serverlessFunctionRegion?: string | null
        sourceFilesOutsideRootDirectory?: boolean
        commandForIgnoringBuildStep?: string | null
        createdAt?: number
        skipGitConnectDuringLink?: boolean
        /** Since June '23 */
        gitComments?: {
            /** Whether the Vercel bot should comment on PRs */
            onPullRequest: boolean
            /** Whether the Vercel bot should comment on commits */
            onCommit: boolean
        }
    }
    /** The flag saying if Vercel Connect configuration is used for builds */
    connectBuildsEnabled?: boolean
    /** The ID of Vercel Connect configuration used for this deployment */
    connectConfigurationId?: string
};
