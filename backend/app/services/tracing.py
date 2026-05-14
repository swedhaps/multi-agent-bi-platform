from opentelemetry import trace

from opentelemetry.sdk.resources import Resource

from opentelemetry.sdk.trace import TracerProvider

from opentelemetry.sdk.trace.export import BatchSpanProcessor

from opentelemetry.exporter.jaeger.thrift import JaegerExporter

resource = Resource.create({
    "service.name": "multi-agent-platform"
})

provider = TracerProvider(
    resource=resource
)

trace.set_tracer_provider(provider)

jaeger_exporter = JaegerExporter(
    agent_host_name="jaeger",
    agent_port=6831,
)

span_processor = BatchSpanProcessor(
    jaeger_exporter
)

provider.add_span_processor(
    span_processor
)

tracer = trace.get_tracer(__name__)