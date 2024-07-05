package com.schoolmate.dto;

public class MessageResponse {
    private boolean emailExistsError;
    private boolean emailNotExistsError;
    private boolean emailChangeError;
    private boolean regNoExistsError;
    private boolean regNoNotExistsError;
    private boolean regNoChangeError;
    private boolean noticeExistsError;
    private boolean noticeNotExistsError;
    private boolean timetableExistsError;
    private boolean timetableNotExistsError;
    private boolean principalExistsError;
    private boolean vicePrincipalExistsError;
    private boolean successful;

    private boolean duplicateError;

    public MessageResponse() {
    }

    public MessageResponse(boolean emailExistsError, boolean emailNotExistsError, boolean emailChangeError,
                           boolean regNoExistsError, boolean regNoNotExistsError, boolean regNoChangeError, boolean noticeExistsError,
                           boolean noticeNotExistsError, boolean timetableExistsError, boolean timetableNotExistsError,
                           boolean principalExistsError, boolean vicePrincipalExistsError, boolean successful, boolean duplicateError) {
        this.emailExistsError = emailExistsError;
        this.emailNotExistsError = emailNotExistsError;
        this.emailChangeError = emailChangeError;
        this.regNoExistsError = regNoExistsError;
        this.regNoNotExistsError = regNoNotExistsError;
        this.regNoChangeError = regNoChangeError;
        this.noticeExistsError = noticeExistsError;
        this.noticeNotExistsError = noticeNotExistsError;
        this.timetableExistsError = timetableExistsError;
        this.timetableNotExistsError = timetableNotExistsError;
        this.principalExistsError = principalExistsError;
        this.vicePrincipalExistsError = vicePrincipalExistsError;
        this.successful = successful;
        this.duplicateError = duplicateError;
    }

    public boolean isEmailExistsError() {
        return emailExistsError;
    }

    public void setEmailExistsError(boolean emailExistsError) {
        this.emailExistsError = emailExistsError;
    }

    public boolean isEmailNotExistsError() {
        return emailNotExistsError;
    }

    public void setEmailNotExistsError(boolean emailNotExistsError) {
        this.emailNotExistsError = emailNotExistsError;
    }

    public boolean isEmailChangeError() {
        return emailChangeError;
    }

    public void setEmailChangeError(boolean emailChangeError) {
        this.emailChangeError = emailChangeError;
    }

    public boolean isRegNoExistsError() {
        return regNoExistsError;
    }

    public void setRegNoExistsError(boolean regNoExistsError) {
        this.regNoExistsError = regNoExistsError;
    }

    public boolean isRegNoNotExistsError() {
        return regNoNotExistsError;
    }

    public void setRegNoNotExistsError(boolean regNoNotExistsError) {
        this.regNoNotExistsError = regNoNotExistsError;
    }

    public boolean isRegNoChangeError() {
        return regNoChangeError;
    }

    public void setRegNoChangeError(boolean regNoChangeError) {
        this.regNoChangeError = regNoChangeError;
    }

    public boolean isNoticeExistsError() {
        return noticeExistsError;
    }

    public void setNoticeExistsError(boolean noticeExistsError) {
        this.noticeExistsError = noticeExistsError;
    }

    public boolean isNoticeNotExistsError() {
        return noticeNotExistsError;
    }

    public void setNoticeNotExistsError(boolean noticeNotExistsError) {
        this.noticeNotExistsError = noticeNotExistsError;
    }

    public boolean isTimetableExistsError() {
        return timetableExistsError;
    }

    public void setTimetableExistsError(boolean timetableExistsError) {
        this.timetableExistsError = timetableExistsError;
    }

    public boolean isTimetableNotExistsError() {
        return timetableNotExistsError;
    }

    public void setTimetableNotExistsError(boolean timetableNotExistsError) {
        this.timetableNotExistsError = timetableNotExistsError;
    }

    public boolean isPrincipalExistsError() {
        return principalExistsError;
    }

    public void setPrincipalExistsError(boolean principalExistsError) {
        this.principalExistsError = principalExistsError;
    }

    public boolean isVicePrincipalExistsError() {
        return vicePrincipalExistsError;
    }

    public void setVicePrincipalExistsError(boolean vicePrincipalExistsError) {
        this.vicePrincipalExistsError = vicePrincipalExistsError;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }

    public boolean isDuplicateError() {
        return duplicateError;
    }

    public void setDuplicateError(boolean duplicateError) {
        this.duplicateError = duplicateError;
    }
}