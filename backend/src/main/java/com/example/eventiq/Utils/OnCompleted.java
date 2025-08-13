package com.example.eventiq.Utils;

public interface OnCompleted {
    void onSuccess();
    default void onFailed() {}
}
