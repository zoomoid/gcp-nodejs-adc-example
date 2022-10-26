# gcp-nodejs-adc-example

This NodeJS project tests out how to configure a firebase(-admin) SDK client both
for GCP compute instances and local development without consolidating configuration
files into the container image (e.g. service account credentials).

In particular, this project tests out how the compute instance connects to the
internal metadata server of GCP to retrieve default service account credentials.

## Usage

Start by creating a compute instance for testing on GCP. How you do this is up to you.
Make sure to select the correct container image, e.g. `ghcr.io/zoomoid/gcp-nodejs-adc-example:latest`

Bind the required ENV variables in the container template (or the CLI). See `.env.example` for details.

The container should start up and list the configured firebase storage bucket, provided it contains 
anything. In this synthetic example, it just contains 3 image files.

To roll out a new container image, use

```bash
gcloud compute instances update-container $INSTANCE_NAME \
  --container-image=ghcr.io/zoomoid/gcp-nodejs-adc-example:v0.1.2
```
