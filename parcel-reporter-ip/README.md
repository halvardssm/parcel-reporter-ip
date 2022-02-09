# parcel-reporter-ip

This package will output aditional IP information.

![example-output](/.github/assets/example-output.png "example-output")

## Usage

Place it after the default, but before other plugins

```json
{
    "extends": "@parcel/config-default",
    "reporters": ["...", "@halvardm/parcel-reporter-ip", "other-plugin"]
}
```

## FAQ

- I can't connect to the public IP
  - This is a problem with your computer or router, you can take a look at [this](https://duckduckgo.com/?t=ffab&q=how+to+open+up+port+on+computer&ia=web) link to find out how to solve it
- I want to remove the plugin name in the output
  - Yes, me too, but the documentation is pretty scarse, so if you know how, please let me know.