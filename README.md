# Eviction Lab 2.0 Map

This repository contains the front-end for the Eviction Lab 2.0 map. See the [ETL pipeline repo](https://github.com/EvictionLab/map-v2-etl) for code that generates static assets for the backend.

## Contributing

- see [CONTRIBUTING.md](./CONTRIBUTING.md)


TODOS:

[24h] Reports (#10)
https://github.com/Hyperobjekt/el-map/issues/10
update map screenshot servce? [21h]

[16h] Analytics (#13)
https://github.com/Hyperobjekt/el-map/issues/13
https://docs.google.com/spreadsheets/d/1rkPXTG-A530_KqCktnoHtzhLKtEhhy8zza0bCUeT8f0/edit#gid=177829442
- verify analytics

<!-- [13h] Search (#8)
https://github.com/Hyperobjekt/el-map/issues/8 -->

[6h] Chart View (#1)
https://github.com/Hyperobjekt/el-map/issues/1
color getter for chart points
tooltip indicators breaks if earlier lines don’t have data

<!-- [8h] Embed View (#12)
https://github.com/Hyperobjekt/el-map/issues/12 -->

[5h] Sharing (#11)
https://github.com/Hyperobjekt/el-map/issues/11

[4h] i18n (Spanish translation) (#9)
https://github.com/Hyperobjekt/el-map/issues/9
- get span lang translations

[4h] Scorecard View (#7)
https://github.com/Hyperobjekt/el-map/issues/7
top line visual treatment
conf intervals
rel to nat avg

[4h] Map Location Cards (#5)
https://github.com/Hyperobjekt/el-map/issues/5
- get updated JSON [use same]
flag top %, ME/NO
name escaping card bounds


map bugs:

[8h] Selected location outlines are not accurate bug (#14)
https://github.com/Hyperobjekt/el-map/issues/14

"region is not available at this zoom level" appears too early

<!-- clicking some block groups (tracts?) doesn't produce a "center", fails
because center isn't visualized... fix: don't require center -->

Legend min/max off, scale 0-1%?
update block group extents

  
[92h]


ETL:
- rerun for display names
- redo extents
- add NESW to states