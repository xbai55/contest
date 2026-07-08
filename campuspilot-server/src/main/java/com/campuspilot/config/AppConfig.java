package com.campuspilot.config;

import java.nio.file.Path;

public record AppConfig(
        String host,
        int port,
        Path staticRoot,
        String agentApiUrl,
        String agentApiKey,
        int agentTimeoutMs,
        int workerThreads
) {
    public static AppConfig load(String[] args) {
        int cliPort = args.length > 0 ? parseInt(args[0], -1) : -1;
        String host = env("CAMPUSPILOT_HOST", "0.0.0.0");
        int port = cliPort > 0 ? cliPort : parseInt(env("CAMPUSPILOT_PORT", "8787"), 8787);
        Path staticRoot = Path.of(env("CAMPUSPILOT_STATIC_ROOT", "../campuspilot-home")).toAbsolutePath().normalize();
        return new AppConfig(
                host,
                port,
                staticRoot,
                env("CAMPUSPILOT_AGENT_API_URL", ""),
                env("CAMPUSPILOT_AGENT_API_KEY", ""),
                parseInt(env("CAMPUSPILOT_AGENT_TIMEOUT_MS", "8000"), 8000),
                parseInt(env("CAMPUSPILOT_WORKER_THREADS", "12"), 12)
        );
    }

    public String hostForLog() {
        return "0.0.0.0".equals(host) ? "127.0.0.1" : host;
    }

    private static String env(String key, String fallback) {
        String value = System.getenv(key);
        return value == null || value.isBlank() ? fallback : value.trim();
    }

    private static int parseInt(String raw, int fallback) {
        try {
            return Integer.parseInt(raw);
        } catch (Exception ignored) {
            return fallback;
        }
    }
}
