import { useState, useEffect } from "react";
import { config as defaultConfig } from "../data/playlist.config";

export default function Configure() {
  // Redirect to player in production
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      window.location.href = "/";
    }
  }, []);
  const [config, setConfig] = useState(defaultConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const updateConfig = (path, value) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const addTrack = () => {
    setConfig(prev => ({
      ...prev,
      tracks: [...prev.tracks, {
        title: "",
        mediaType: "3d",
        url: "",
        visualizer: "singularity",
        lyrics: []
      }]
    }));
  };

  const updateTrack = (index, field, value) => {
    setConfig(prev => ({
      ...prev,
      tracks: prev.tracks.map((track, i) =>
        i === index ? { ...track, [field]: value } : track
      )
    }));
  };

  const removeTrack = (index) => {
    setConfig(prev => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index)
    }));
  };

  const saveConfig = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch('/api/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const result = await response.json();

      if (response.ok) {
        setSaveMessage("Configuration saved successfully! Redirecting to player...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setSaveMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSaveMessage("Error saving configuration. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#ffffff",
      fontFamily: "'Hanken Grotesk', sans-serif",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#f00c6f", marginBottom: "30px" }}>
          MediaSingularity Player Configuration
        </h1>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#12abff" }}>Album Info</h2>
          <div style={{ display: "grid", gap: "15px", marginTop: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Artist Name</label>
              <input
                type="text"
                value={config.artist}
                onChange={(e) => updateConfig('artist', e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#fff"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Album Title (optional)</label>
              <input
                type="text"
                value={config.albumTitle || ""}
                onChange={(e) => updateConfig('albumTitle', e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#fff"
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#12abff" }}>Visual Theme</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginTop: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Primary Color</label>
              <input
                type="color"
                value={config.theme.color1}
                onChange={(e) => updateConfig('theme.color1', e.target.value)}
                style={{ width: "100%", height: "40px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Secondary Color</label>
              <input
                type="color"
                value={config.theme.color2}
                onChange={(e) => updateConfig('theme.color2', e.target.value)}
                style={{ width: "100%", height: "40px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Background Color</label>
              <input
                type="color"
                value={config.theme.background}
                onChange={(e) => updateConfig('theme.background', e.target.value)}
                style={{ width: "100%", height: "40px" }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#12abff" }}>Player Settings</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Player Skin</label>
              <select
                value={config.playerSkin}
                onChange={(e) => updateConfig('playerSkin', e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#fff"
                }}
              >
                <option value="glass">Glass (semi-transparent)</option>
                <option value="brutalist">Brutalist (bold borders)</option>
                <option value="retro-terminal">Retro Terminal (monospace)</option>
                <option value="minimal">Minimal (clean)</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>Lyric Font</label>
              <select
                value={config.lyricFont}
                onChange={(e) => updateConfig('lyricFont', e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  color: "#fff"
                }}
              >
                <option value="grotesque">Grotesque (sans-serif)</option>
                <option value="serif">Serif (classic)</option>
                <option value="mono">Mono (technical)</option>
                <option value="handwritten">Handwritten (organic)</option>
                <option value="condensed">Condensed (bold)</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                checked={config.autoAdvance}
                onChange={(e) => updateConfig('autoAdvance', e.target.checked)}
              />
              Auto-advance to next track when current finishes
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h2 style={{ color: "#12abff" }}>Tracks</h2>
            <button
              onClick={addTrack}
              style={{
                background: "#f00c6f",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              + Add Track
            </button>
          </div>

          {config.tracks.map((track, index) => (
            <div key={index} style={{
              background: "#1a1a1a",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
              border: "1px solid #333"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ color: "#f00c6f" }}>Track {index + 1}</h3>
                <button
                  onClick={() => removeTrack(index)}
                  style={{
                    background: "#ff4444",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  Remove
                </button>
              </div>

              <div style={{ display: "grid", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px" }}>Track Title</label>
                  <input
                    type="text"
                    value={track.title}
                    onChange={(e) => updateTrack(index, 'title', e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#2a2a2a",
                      border: "1px solid #444",
                      borderRadius: "4px",
                      color: "#fff"
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Media Type</label>
                    <select
                      value={track.mediaType}
                      onChange={(e) => updateTrack(index, 'mediaType', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#2a2a2a",
                        border: "1px solid #444",
                        borderRadius: "4px",
                        color: "#fff"
                      }}
                    >
                      <option value="3d">3D Visualizer</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      {track.mediaType === '3d' ? 'Audio File Path' : 'Video File Path'}
                    </label>
                    <input
                      type="text"
                      value={track.url}
                      onChange={(e) => updateTrack(index, 'url', e.target.value)}
                      placeholder={track.mediaType === '3d' ? '/audio/your-track.mp3' : '/video/your-video.mp4'}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#2a2a2a",
                        border: "1px solid #444",
                        borderRadius: "4px",
                        color: "#fff"
                      }}
                    />
                  </div>
                </div>

                {track.mediaType === '3d' && (
                  <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>3D Visualizer</label>
                    <select
                      value={track.visualizer}
                      onChange={(e) => updateTrack(index, 'visualizer', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#2a2a2a",
                        border: "1px solid #444",
                        borderRadius: "4px",
                        color: "#fff"
                      }}
                    >
                      <option value="singularity">Singularity (orbital rings)</option>
                      <option value="nebula">Nebula (particle cloud)</option>
                      <option value="waveform">Waveform (frequency bars)</option>
                      <option value="minimal">Minimal (core sphere)</option>
                      <option value="custom">Custom (build your own)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display: "block", marginBottom: "5px" }}>Lyrics (optional)</label>
                  <textarea
                    value={Array.isArray(track.lyrics) ? track.lyrics.map(l => l.text).join('\n') : track.lyrics}
                    onChange={(e) => updateTrack(index, 'lyrics', e.target.value.split('\n').filter(line => line.trim()))}
                    placeholder="Enter lyrics line by line..."
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#2a2a2a",
                      border: "1px solid #444",
                      borderRadius: "4px",
                      color: "#fff",
                      fontFamily: "monospace"
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "30px" }}>
          <button
            onClick={saveConfig}
            disabled={isSaving}
            style={{
              background: isSaving ? "#666" : "#12abff",
              color: "#fff",
              border: "none",
              padding: "15px 30px",
              borderRadius: "4px",
              cursor: isSaving ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {isSaving ? "Saving..." : "Save & Preview"}
          </button>
          {saveMessage && (
            <p style={{
              marginTop: "10px",
              color: saveMessage.includes("Error") ? "#ff6b6b" : "#4ecdc4",
              fontWeight: "bold"
            }}>
              {saveMessage}
            </p>
          )}
        </div>

        <div style={{ marginTop: "50px", padding: "20px", background: "#1a1a1a", borderRadius: "8px" }}>
          <h3 style={{ color: "#f00c6f" }}>How It Works</h3>
          <ol style={{ color: "#ccc", lineHeight: "1.6" }}>
            <li>Fill out the form above with your album details</li>
            <li>Click "Save & Preview" to save your configuration</li>
            <li>You'll be automatically redirected to see your player</li>
            <li>Add your audio/video files to the appropriate <code>public/</code> folders</li>
            <li>Deploy to Vercel when ready!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}