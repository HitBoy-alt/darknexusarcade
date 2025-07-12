<style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
        background: #000;
    }
    #embed-container {
        position: relative;
        width: 100%;
        height: 100vh;
    }
    iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
    }
    .controls {
        position: fixed;
        top: 300px; /* moved further down */
        right: 10px;
        z-index: 1000;
        display: flex;
        gap: 8px;
        background: rgba(0,0,0,0.7);
        border-radius: 20px;
        padding: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }
    .control-btn {
        background: #6a0dad;
        color: white;
        border: none;
        border-radius: 16px;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
        white-space: nowrap;
    }
    .control-btn:hover {
        background: #5a0b9d;
        transform: scale(1.05);
    }
    .control-btn:focus {
        outline: 2px solid #fff;
        outline-offset: 2px;
    }
</style>
