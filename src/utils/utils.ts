export function distinct<T>(colecao: T[], atributo: keyof T): T[] {
    const seen = new Set();
    return colecao.filter(item => {
        const value = item[atributo];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

export function groupBy<T>(colecao: T[], atributo: keyof T): Record<string, T[]> {
    return colecao.reduce((acc, item) => {
        const key = String(item[atributo]);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

export function orderBy<T>(colecao: T[], atributo: keyof T): T[] {
    return colecao.slice().sort((a, b) => {
        if (a[atributo] < b[atributo]) return -1;
        if (a[atributo] > b[atributo]) return 1;
        return 0;
    });
}

export function fold<T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U {
    return array.reduce(reducer, init);
}

export function compose<A, B, C>(f1: (arg: B) => C, f2: (arg: A) => B) {
    return (arg: A): C => f1(f2(arg));
}


const issues = [
    {
      "url": "https://api.github.com/repos/rails/rails/issues/45535",
      "repository_url": "https://api.github.com/repos/rails/rails",
      "labels_url": "https://api.github.com/repos/rails/rails/issues/45535/labels{/name}",
      "comments_url": "https://api.github.com/repos/rails/rails/issues/45535/comments",
      "events_url": "https://api.github.com/repos/rails/rails/issues/45535/events",
      "html_url": "https://github.com/rails/rails/issues/45535",
      "id": 1295825634,
      "node_id": "I_kwDNIULOTTy64g",
      "number": 45535,
      "title": "Getting 'Connection Closed: 1006' when trying to establish a connection to ActionCable",
      "user": {
        "login": "gustavothecoder",
        "id": 57065994,
        "avatar_url": "https://avatars.githubusercontent.com/u/57065994?v=4",
        "html_url": "https://github.com/gustavothecoder",
      },
      "labels": [],
      "state": "open",
      "locked": false,
      "comments": 2,
      "created_at": "2022-07-06T13:13:52Z",
      "updated_at": "2022-07-06T17:08:26Z",
      "author_association": "CONTRIBUTOR",
      "body": "Expected behavior... Actual behavior...",
      "reactions": {
        "total_count": 0,
        "+1": 0,
        "-1": 0,
        "laugh": 0,
        "hooray": 0,
        "confused": 0,
        "heart": 0,
        "rocket": 0,
        "eyes": 0
      }
    },
    {
      "url": "https://api.github.com/repos/rails/rails/issues/45530",
      "repository_url": "https://api.github.com/repos/rails/rails",
      "labels_url": "https://api.github.com/repos/rails/rails/issues/45530/labels{/name}",
      "comments_url": "https://api.github.com/repos/rails/rails/issues/45530/comments",
      "events_url": "https://api.github.com/repos/rails/rails/issues/45530/events",
      "html_url": "https://github.com/rails/rails/pull/45530",
      "id": 1295249622,
      "node_id": "PR_kwDNIULOOufcVw",
      "number": 45530,
      "title": "Remove adding sprockets during app:update",
      "user": {
        "login": "skipkayhil",
        "id": 6014046,
        "avatar_url": "https://avatars.githubusercontent.com/u/6014046?v=4",
        "html_url": "https://github.com/skipkayhil",
      },
      "labels": [
        {
          "id": 107195,
          "node_id": "MDU6TGFiZWwxMDcxOTU=",
          "url": "https://api.github.com/repos/rails/rails/labels/railties",
          "name": "railties",
          "color": "8BE06E",
          "default": false
        }
      ],
      "state": "open",
      "locked": false,
      "comments": 0,
      "created_at": "2022-07-06T06:28:53Z",
      "updated_at": "2022-07-06T06:28:56Z",
      "author_association": "MEMBER",
      "pull_request": {
        "url": "https://api.github.com/repos/rails/rails/pulls/45530",
        "html_url": "https://github.com/rails/rails/pull/45530",
        "diff_url": "https://github.com/rails/rails/pull/45530.diff",
        "patch_url": "https://github.com/rails/rails/pull/45530.patch"
      },
      "body": "Summary... This was useful during the upgrade to Rails 7..."
    },
    {
      "url": "https://api.github.com/repos/rails/rails/issues/45529",
      "repository_url": "https://api.github.com/repos/rails/rails",
      "labels_url": "https://api.github.com/repos/rails/rails/issues/45529/labels{/name}",
      "comments_url": "https://api.github.com/repos/rails/rails/issues/45529/comments",
      "events_url": "https://api.github.com/repos/rails/rails/issues/45529/events",
      "html_url": "https://github.com/rails/rails/pull/45529",
      "id": 1295233245,
      "node_id": "PR_kwDNIULOOuehuw",
      "number": 45529,
      "title": "Fix adding sprockets-rails during upgrade",
      "user": {
        "login": "skipkayhil",
        "id": 6014046,
        "avatar_url": "https://avatars.githubusercontent.com/u/6014046?v=4",
        "html_url": "https://github.com/skipkayhil",
      },
      "labels": [
        {
          "id": 107195,
          "node_id": "MDU6TGFiZWwxMDcxOTU=",
          "url": "https://api.github.com/repos/rails/rails/labels/railties",
          "name": "railties",
          "color": "8BE06E",
          "default": false
        }
      ],
      "state": "open",
      "locked": false,
      "comments": 0,
      "created_at": "2022-07-06T06:17:28Z",
      "updated_at": "2022-07-06T06:35:59Z",
      "author_association": "MEMBER",
      "pull_request": {
        "url": "https://api.github.com/repos/rails/rails/pulls/45529",
        "html_url": "https://github.com/rails/rails/pull/45529",
        "diff_url": "https://github.com/rails/rails/pull/45529.diff",
        "patch_url": "https://github.com/rails/rails/pull/45529.patch"
      },
      "body": "Summary... The previous strategy for adding `sprockets-rails` did not work for two reasons..."
    },
    {
      "url": "https://api.github.com/repos/rails/rails/issues/45528",
      "repository_url": "https://api.github.com/repos/rails/rails",
      "labels_url": "https://api.github.com/repos/rails/rails/issues/45528/labels{/name}",
      "comments_url": "https://api.github.com/repos/rails/rails/issues/45528/comments",
      "events_url": "https://api.github.com/repos/rails/rails/issues/45528/events",
      "html_url": "https://github.com/rails/rails/pull/45528",
      "id": 1294952934,
      "node_id": "PR_kwDNIULOOuPPrg",
      "number": 45528,
      "title": "Add `--parent` option to job generator to specify parent class of job.",
      "user": {
        "login": "gmcgibbon",
        "id": 5162312,
        "avatar_url": "https://avatars.githubusercontent.com/u/5162312?v=4",
        "html_url": "https://github.com/gmcgibbon",
      },
      "labels": [
        {
          "id": 107195,
          "node_id": "MDU6TGFiZWwxMDcxOTU=",
          "url": "https://api.github.com/repos/rails/rails/labels/railties",
          "name": "railties",
          "color": "8BE06E",
          "default": false
        },
        {
          "id": 123812746,
          "node_id": "MDU6TGFiZWwxMjM4MTI3NDY=",
          "url": "https://api.github.com/repos/rails/rails/labels/activejob",
          "name": "activejob",
          "color": "5319e7",
          "default": false
        }
      ],
    "state": "open",
    "locked": false,
    "assignee": null,
    "assignees": [],
    "milestone": null,
    "comments": 2,
    "created_at": "2022-07-06T13:13:52Z",
    "updated_at": "2022-07-06T17:08:26Z",
    "closed_at": null,
    "author_association": "CONTRIBUTOR",
    "body": "### Expected behavior\nI would like my real-time chat using ActionCable to work in a production-like environment using Redis as the adapter.\n\n### Actual behavior\n...",
    "reactions": {
      "url": "https://api.github.com/repos/rails/rails/issues/45535/reactions",
      "total_count": 0,
      "+1": 0,
      "-1": 0,
      "laugh": 0,
      "hooray": 0,
      "confused": 0,
      "heart": 0,
      "rocket": 0,
      "eyes": 0
    },
    "timeline_url": "https://api.github.com/repos/rails/rails/issues/45535/timeline",
    "performed_via_github_app": null,
    "state_reason": null
  },
  {
    url: 'https://api.github.com/repos/rails/rails/issues/45529',
    repository_url: 'https://api.github.com/repos/rails/rails',
    labels_url: 'https://api.github.com/repos/rails/rails/issues/45529/labels{/name}',
    comments_url: 'https://api.github.com/repos/rails/rails/issues/45529/comments',
    events_url: 'https://api.github.com/repos/rails/rails/issues/45529/events',
    html_url: 'https://github.com/rails/rails/pull/45529',
    id: 1295233245,
    node_id: 'PR_kwDNIULOOuehuw',
    number: 45529,
    title: 'Fix adding sprockets-rails during upgrade',
    user: {
      login: 'skipkayhil',
      id: 6014046,
      avatar_url: 'https://avatars.githubusercontent.com/u/6014046?v=4',
      html_url: 'https://github.com/skipkayhil'
    },
    labels: [ [Object] ],
    state: 'open',
    locked: false,
    comments: 0,
    created_at: '2022-07-06T06:17:28Z',
    updated_at: '2022-07-06T06:35:59Z',
    author_association: 'MEMBER',
    pull_request: {
      url: 'https://api.github.com/repos/rails/rails/pulls/45529',
      html_url: 'https://github.com/rails/rails/pull/45529',
      diff_url: 'https://github.com/rails/rails/pull/45529.diff',
      patch_url: 'https://github.com/rails/rails/pull/45529.patch'
    },
    body: 'Summary... The previous strategy for adding `sprockets-rails` did not work for two reasons...'
  }
];

const distinctIssues = distinct(issues, "id");
console.log(distinctIssues);
